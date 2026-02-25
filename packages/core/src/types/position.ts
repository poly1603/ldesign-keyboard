/**
 * 弹出位置类型定义
 * @module types/position
 */

/**
 * 设备类型
 */
export type DeviceType = 'mobile' | 'desktop'

/**
 * 弹出位置
 */
export type PopupPlacement =
  | 'bottom'      // 目标元素下方（PC 默认）
  | 'top'         // 目标元素上方
  | 'bottom-sheet' // 屏幕底部滑出（移动端默认）

/**
 * 位置坐标
 */
export interface Position {
  x: number
  y: number
}

/**
 * 尺寸
 */
export interface Size {
  width: number
  height: number
}

/**
 * 边界矩形
 */
export interface BoundingRect extends Position, Size {}

/**
 * 弹出层位置配置
 */
export interface PopupPositionConfig {
  /**
   * 偏移量
   */
  offset?: {
    x?: number
    y?: number
  }

  /**
   * 是否自动调整位置以适应视口
   * @default true
   */
  autoAdjust?: boolean

  /**
   * 与视口边缘的最小距离
   * @default 8
   */
  viewportPadding?: number

  /**
   * PC 端弹出位置
   * @default 'bottom'
   */
  desktopPlacement?: Exclude<PopupPlacement, 'bottom-sheet'>

  /**
   * 移动端弹出位置
   * @default 'bottom-sheet'
   */
  mobilePlacement?: PopupPlacement

  /**
   * 是否显示遮罩层（移动端）
   * @default true
   */
  showMask?: boolean

  /**
   * 遮罩层点击关闭
   * @default true
   */
  maskClosable?: boolean

  /**
   * 动画时长（毫秒）
   * @default 300
   */
  animationDuration?: number
}

/**
 * 弹出层计算结果
 */
export interface PopupPositionResult {
  /**
   * 计算后的位置
   */
  position: Position

  /**
   * 实际使用的弹出位置
   */
  placement: PopupPlacement

  /**
   * 是否需要翻转位置
   */
  flipped: boolean

  /**
   * 最大可用高度
   */
  maxHeight?: number

  /**
   * 最大可用宽度
   */
  maxWidth?: number

  /**
   * CSS transform 样式
   */
  transform?: string
}

/**
 * 视口信息
 */
export interface ViewportInfo {
  /**
   * 视口宽度
   */
  width: number

  /**
   * 视口高度
   */
  height: number

  /**
   * 滚动位置
   */
  scrollX: number
  scrollY: number

  /**
   * 是否为移动设备
   */
  isMobile: boolean

  /**
   * 安全区域（针对刘海屏等）
   */
  safeArea?: {
    top: number
    right: number
    bottom: number
    left: number
  }
}
