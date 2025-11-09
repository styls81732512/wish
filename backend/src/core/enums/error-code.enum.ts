export enum ErrorCode {
  /// Global Type
  /** 通用所有 type orm 的錯誤 */
  GLOBAL_TYPE_ORM = '50001',

  /** 通用所有 httpRequest 的錯誤 */
  GLOBAL_HTTP_REQUEST = '50002',

  /** 通用所有權限不足錯誤 */
  GLOBAL_PERMISSION_DENIED = '50003',

  /** 通用所有驗證錯誤 */
  GLOBAL_VALIDATE_PIPE = '40000',

  /// Partial Type
  /** 指定資料不存在 */
  NOT_EXIST = '01',

  /** 未預期的檔案格式 */
  UNEXPECTED_FILE_FORMAT = '02',

  /** 未預期的資料格式 */
  UNEXPECTED_DATA_FORMAT = '03',

  /** 未驗證 */
  UNAUTHORIZED = '04',

  /** 請求太頻繁 */
  TOO_MANY_REQUESTS = '05',

  /** 指定資料已存在 */
  EXIST = '06',
}
