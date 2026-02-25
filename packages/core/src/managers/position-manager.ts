/**
 * 弹出位置管理器
 * @module managers/position-manager
 */

import type {
  BoundingRect,
  PopupPlacement,
  PopupPositionConfig,
  PopupPositionResult,
  Position,
} from '../types'
import { getBoundingRect } from '../utils/dom'
import { getViewportInfo, isMobile } from '../utils/device'

/**
 * 默认位置配置
 */
const DEFAULT_CONFIG: Required<PopupPositionConfig> = {
  offset: { x: 0, y: 8 },
  autoAdjust: true,
  viewportPadding: 8,
  desktopPlacement: 'bottom',
  mobilePlacement: 'bottom-sheet',
  showMask: true,
  maskClosable: true,
  animationDuration: 300,
}

/**
 * 位置管理器类
 * 计算键盘弹出层的位置，支持 PC 和移动端自适应
 */
export class PositionManager {
  private config: Required<PopupPositionConfig>

  constructor(config: PopupPositionConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<PopupPositionConfig>): void {
    Object.assign(this.config, config)
  }

  /**
   * 获取配置
   */
  getConfig(): Readonly<Required<PopupPositionConfig>> {
    return { ...this.config }
  }

  /**
   * 计算弹出位置
   * @param targetElement - 目标元素（如 input）
   * @param popupSize - 弹出层尺寸
   * @returns 位置计算结果
   */
  calculate(
    targetElement: HTMLElement | null,
    popupSize: { width: number; height: number },
  ): PopupPositionResult {
    const viewport = getViewportInfo()
    const isMobileDevice = isMobile()

    // 移动端使用 bottom-sheet
    if (isMobileDevice && this.config.mobilePlacement === 'bottom-sheet') {
      return this.calculateBottomSheet(viewport, popupSize)
    }

    // PC 端或移动端非 bottom-sheet
    if (!targetElement) {
      // 无目标元素，居中显示
      return this.calculateCentered(viewport, popupSize)
    }

    const targetRect = getBoundingRect(targetElement)
    const placement = isMobileDevice
      ? this.config.mobilePlacement
      : this.config.desktopPlacement

    // bottom-sheet 已经在前面处理，这里只会是 'bottom' 或 'top'
    const relativePlace = placement === 'bottom-sheet' ? 'bottom' : placement
    return this.calculateRelativeToTarget(targetRect, popupSize, viewport, relativePlace)
  }

  /**
   * 计算 bottom-sheet 位置（移动端从底部滑出）
   */
  private calculateBottomSheet(
    viewport: { width: number; height: number; scrollY: number; safeArea?: { bottom: number } },
    popupSize: { width: number; height: number },
  ): PopupPositionResult {
    const safeAreaBottom = viewport.safeArea?.bottom ?? 0

    return {
      position: {
        x: 0,
        y: viewport.height - popupSize.height - safeAreaBottom,
      },
      placement: 'bottom-sheet',
      flipped: false,
      maxHeight: viewport.height * 0.6, // 最大占屏幕高度的 60%
      maxWidth: viewport.width,
      transform: 'translateY(0)',
    }
  }

  /**
   * 计算居中位置
   */
  private calculateCentered(
    viewport: { width: number; height: number },
    popupSize: { width: number; height: number },
  ): PopupPositionResult {
    return {
      position: {
        x: (viewport.width - popupSize.width) / 2,
        y: (viewport.height - popupSize.height) / 2,
      },
      placement: 'bottom',
      flipped: false,
    }
  }

  /**
   * 计算相对于目标元素的位置
   */
  private calculateRelativeToTarget(
    targetRect: BoundingRect,
    popupSize: { width: number; height: number },
    viewport: { width: number; height: number; scrollX: number; scrollY: number },
    preferredPlacement: Exclude<PopupPlacement, 'bottom-sheet'>,
  ): PopupPositionResult {
    const { offset, viewportPadding, autoAdjust } = this.config

    let position: Position
    let placement = preferredPlacement
    let flipped = false

    // 计算 bottom 位置（左对齐）
    const bottomPosition: Position = {
      x: targetRect.x + (offset.x ?? 0),
      y: targetRect.y + targetRect.height + (offset.y ?? 8),
    }

    // 计算 top 位置（左对齐）
    const topPosition: Position = {
      x: targetRect.x + (offset.x ?? 0),
      y: targetRect.y - popupSize.height - (offset.y ?? 8),
    }

    if (preferredPlacement === 'bottom') {
      position = bottomPosition

      // 检查是否需要翻转到顶部
      if (autoAdjust && position.y + popupSize.height > viewport.height - viewportPadding) {
        // 检查顶部是否有足够空间
        if (topPosition.y >= viewportPadding) {
          position = topPosition
          placement = 'top'
          flipped = true
        }
      }
    }
    else {
      position = topPosition

      // 检查是否需要翻转到底部
      if (autoAdjust && position.y < viewportPadding) {
        // 检查底部是否有足够空间
        if (bottomPosition.y + popupSize.height <= viewport.height - viewportPadding) {
          position = bottomPosition
          placement = 'bottom'
          flipped = true
        }
      }
    }

    // 水平方向调整，确保不超出视口
    if (autoAdjust) {
      // 左边界检查
      if (position.x < viewportPadding) {
        position.x = viewportPadding
      }

      // 右边界检查
      if (position.x + popupSize.width > viewport.width - viewportPadding) {
        position.x = viewport.width - popupSize.width - viewportPadding
      }
    }

    // 计算最大可用高度
    const maxHeight = placement === 'bottom'
      ? viewport.height - position.y - viewportPadding
      : targetRect.y - viewportPadding

    return {
      position,
      placement,
      flipped,
      maxHeight: Math.max(200, maxHeight), // 最小高度 200px
      maxWidth: viewport.width - viewportPadding * 2,
    }
  }

  /**
   * 获取弹出层初始样式（用于动画）
   */
  getInitialStyles(placement: PopupPlacement): Partial<CSSStyleDeclaration> {
    switch (placement) {
      case 'bottom-sheet':
        return {
          transform: 'translateY(100%)',
          opacity: '1',
        }
      case 'bottom':
        return {
          transform: 'translateY(-10px)',
          opacity: '0',
        }
      case 'top':
        return {
          transform: 'translateY(10px)',
          opacity: '0',
        }
      default:
        return {
          opacity: '0',
        }
    }
  }

  /**
   * 获取弹出层最终样式（动画结束）
   */
  getFinalStyles(placement: PopupPlacement): Partial<CSSStyleDeclaration> {
    return {
      transform: 'translateY(0)',
      opacity: '1',
    }
  }

  /**
   * 获取弹出层退出样式
   */
  getExitStyles(placement: PopupPlacement): Partial<CSSStyleDeclaration> {
    return this.getInitialStyles(placement)
  }

  /**
   * 获取动画时长
   */
  getAnimationDuration(): number {
    return this.config.animationDuration
  }

  /**
   * 检查是否显示遮罩
   */
  shouldShowMask(): boolean {
    return isMobile() && this.config.showMask
  }

  /**
   * 检查遮罩是否可点击关闭
   */
  isMaskClosable(): boolean {
    return this.config.maskClosable
  }
}

/**
 * 创建位置管理器实例
 */
export function createPositionManager(config?: PopupPositionConfig): PositionManager {
  return new PositionManager(config)
}
