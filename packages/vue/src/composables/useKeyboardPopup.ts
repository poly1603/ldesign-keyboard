/**
 * 键盘弹出层 Composable
 * @module composables/useKeyboardPopup
 */

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { CSSProperties, Ref } from 'vue'
import {
  createPositionManager,
  isMobile,
  onClickOutside,
  onViewportChange,
  type PopupPlacement,
  type PopupPositionConfig,
  type PopupPositionResult,
} from '@ldesign/keyboard-core'

/**
 * useKeyboardPopup 选项
 */
export interface UseKeyboardPopupOptions extends PopupPositionConfig {
  /**
   * 是否显示
   */
  visible?: Ref<boolean>

  /**
   * 目标元素
   */
  target?: Ref<HTMLElement | null>

  /**
   * 弹出层元素
   */
  popup?: Ref<HTMLElement | null>

  /**
   * 点击外部关闭
   */
  closeOnClickOutside?: boolean

  /**
   * 关闭回调
   */
  onClose?: () => void
}

/**
 * useKeyboardPopup 返回值
 */
export interface UseKeyboardPopupReturn {
  /**
   * 弹出层样式
   */
  popupStyles: Ref<CSSProperties>

  /**
   * 遮罩层样式
   */
  maskStyles: Ref<CSSProperties>

  /**
   * 当前弹出位置
   */
  placement: Ref<PopupPlacement>

  /**
   * 是否移动端
   */
  isMobileDevice: Ref<boolean>

  /**
   * 是否显示遮罩
   */
  showMask: Ref<boolean>

  /**
   * 是否正在动画中
   */
  isAnimating: Ref<boolean>

  /**
   * 更新位置
   */
  updatePosition: () => void

  /**
   * 关闭弹出层
   */
  close: () => void
}

/**
 * 键盘弹出层 Composable
 */
export function useKeyboardPopup(options: UseKeyboardPopupOptions = {}): UseKeyboardPopupReturn {
  const {
    visible = ref(false),
    target = ref(null),
    popup = ref(null),
    closeOnClickOutside = true,
    onClose,
    ...positionConfig
  } = options

  // 创建位置管理器
  const positionManager = createPositionManager(positionConfig)

  // 响应式状态
  const popupStyles = ref<CSSProperties>({})
  const maskStyles = ref<CSSProperties>({})
  const placement = ref<PopupPlacement>('bottom')
  const isMobileDevice = ref(isMobile())
  const showMask = ref(false)
  const isAnimating = ref(false)

  // 清理函数
  let cleanupClickOutside: (() => void) | null = null
  let cleanupViewportChange: (() => void) | null = null
  let cleanupScroll: (() => void) | null = null

  /**
   * 更新弹出层位置
   */
  const updatePosition = () => {
    if (!popup.value) return

    const popupRect = popup.value.getBoundingClientRect()
    const result = positionManager.calculate(target.value, {
      width: popupRect.width || 300,
      height: popupRect.height || 260,
    })

    placement.value = result.placement
    showMask.value = positionManager.shouldShowMask()

    // 设置弹出层样式
    if (result.placement === 'bottom-sheet') {
      // 移动端底部弹出
      popupStyles.value = {
        position: 'fixed',
        left: '0',
        right: '0',
        bottom: '0',
        maxHeight: `${result.maxHeight}px`,
        zIndex: 1000,
      }
    }
    else {
      // PC 端下拉弹出
      popupStyles.value = {
        position: 'fixed',
        left: `${result.position.x}px`,
        top: `${result.position.y}px`,
        maxHeight: result.maxHeight ? `${result.maxHeight}px` : undefined,
        maxWidth: result.maxWidth ? `${result.maxWidth}px` : undefined,
        zIndex: 1000,
      }
    }

    // 设置遮罩层样式
    if (showMask.value) {
      maskStyles.value = {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
      }
    }
  }

  /**
   * 关闭弹出层
   */
  const close = () => {
    onClose?.()
  }

  // 监听 visible 变化
  watch(visible, (newVisible) => {
    if (newVisible) {
      // 显示时
      isMobileDevice.value = isMobile()

      // 延迟计算位置（等待 DOM 渲染）
      requestAnimationFrame(() => {
        updatePosition()

        // 添加点击外部关闭监听
        if (closeOnClickOutside && popup.value) {
          cleanupClickOutside = onClickOutside(popup.value, (event) => {
            // 检查是否点击在目标元素上
            if (target.value && target.value.contains(event.target as Node)) {
              return
            }
            close()
          })
        }
      })

      // 监听视口变化
      cleanupViewportChange = onViewportChange(() => {
        isMobileDevice.value = isMobile()
        updatePosition()
      })

      // PC 端监听滚动事件，跟随滚动
      if (!isMobileDevice.value) {
        const handleScroll = () => {
          requestAnimationFrame(() => {
            updatePosition()
          })
        }
        window.addEventListener('scroll', handleScroll, true)
        cleanupScroll = () => {
          window.removeEventListener('scroll', handleScroll, true)
        }
      }
    }
    else {
      // 隐藏时清理
      cleanupClickOutside?.()
      cleanupClickOutside = null
      cleanupViewportChange?.()
      cleanupViewportChange = null
      cleanupScroll?.()
      cleanupScroll = null
    }
  }, { immediate: true })

  // 监听目标元素变化
  watch(target, () => {
    if (visible.value) {
      updatePosition()
    }
  })

  // 组件卸载时清理
  onBeforeUnmount(() => {
    cleanupClickOutside?.()
    cleanupViewportChange?.()
    cleanupScroll?.()
  })

  return {
    popupStyles,
    maskStyles,
    placement,
    isMobileDevice,
    showMask,
    isAnimating,
    updatePosition,
    close,
  }
}
