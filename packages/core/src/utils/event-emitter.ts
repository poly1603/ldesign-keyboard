/**
 * 事件发射器
 * @module utils/event-emitter
 */

/**
 * 事件处理函数类型
 */
export type EventHandler<T = unknown> = (data: T) => void

/**
 * 事件处理器配置
 */
export interface EventHandlerOptions {
  /**
   * 是否只触发一次
   */
  once?: boolean

  /**
   * 优先级（数字越大优先级越高）
   */
  priority?: number
}

/**
 * 内部事件处理器包装
 */
interface EventHandlerWrapper<T> {
  handler: EventHandler<T>
  options: EventHandlerOptions
}

/**
 * 事件发射器类
 */
export class EventEmitter<EventMap extends Record<string, unknown>> {
  private handlers = new Map<keyof EventMap, Set<EventHandlerWrapper<unknown>>>()

  /**
   * 订阅事件
   */
  on<K extends keyof EventMap>(
    event: K,
    handler: EventHandler<EventMap[K]>,
    options: EventHandlerOptions = {},
  ): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }

    const handlers = this.handlers.get(event)!
    const wrapper: EventHandlerWrapper<EventMap[K]> = {
      handler: handler as EventHandler<unknown>,
      options,
    }

    handlers.add(wrapper as EventHandlerWrapper<unknown>)

    return () => {
      handlers.delete(wrapper as EventHandlerWrapper<unknown>)
      if (handlers.size === 0) {
        this.handlers.delete(event)
      }
    }
  }

  /**
   * 订阅事件（仅触发一次）
   */
  once<K extends keyof EventMap>(
    event: K,
    handler: EventHandler<EventMap[K]>,
    options: EventHandlerOptions = {},
  ): () => void {
    return this.on(event, handler, { ...options, once: true })
  }

  /**
   * 取消订阅事件
   */
  off<K extends keyof EventMap>(
    event: K,
    handler?: EventHandler<EventMap[K]>,
  ): void {
    if (!handler) {
      this.handlers.delete(event)
      return
    }

    const handlers = this.handlers.get(event)
    if (handlers) {
      handlers.forEach((wrapper) => {
        if (wrapper.handler === handler) {
          handlers.delete(wrapper)
        }
      })
      if (handlers.size === 0) {
        this.handlers.delete(event)
      }
    }
  }

  /**
   * 发布事件
   */
  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    const handlers = this.handlers.get(event)
    if (!handlers || handlers.size === 0) {
      return
    }

    // 按优先级排序
    const sortedHandlers = Array.from(handlers).sort((a, b) => {
      const priorityA = a.options.priority ?? 0
      const priorityB = b.options.priority ?? 0
      return priorityB - priorityA
    })

    const toRemove: EventHandlerWrapper<unknown>[] = []

    sortedHandlers.forEach((wrapper) => {
      try {
        wrapper.handler(data)
        if (wrapper.options.once) {
          toRemove.push(wrapper)
        }
      }
      catch (error) {
        console.error(`[KeyboardEventEmitter] Error in event handler for "${String(event)}":`, error)
      }
    })

    // 移除 once 处理器
    toRemove.forEach(wrapper => handlers.delete(wrapper))
    if (handlers.size === 0) {
      this.handlers.delete(event)
    }
  }

  /**
   * 清除所有事件订阅
   */
  clear(): void {
    this.handlers.clear()
  }

  /**
   * 获取事件订阅数量
   */
  listenerCount(event?: keyof EventMap): number {
    if (event !== undefined) {
      return this.handlers.get(event)?.size ?? 0
    }

    let count = 0
    this.handlers.forEach((handlers) => {
      count += handlers.size
    })
    return count
  }
}
