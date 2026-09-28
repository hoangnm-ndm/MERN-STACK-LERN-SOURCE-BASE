import { useEffect, useState } from 'react';

/**
 * Trả về giá trị đã trễ — dùng cho ô tìm kiếm để mỗi ký tự không thành một
 * request API.
 *
 * @template T
 * @param {T} value
 * @param {number} [delay] milliseconds
 * @returns {T}
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // TODO:
    // const timer = setTimeout(() => setDebouncedValue(value), delay);
    // return () => clearTimeout(timer);
    //
    // Hàm cleanup là PHẦN QUAN TRỌNG NHẤT: mỗi lần `value` đổi, timer cũ bị huỷ
    // và đặt lại timer mới. Thiếu clearTimeout thì mọi timer đều chạy và hoá ra
    // không debounce gì cả.
  }, [value, delay]);

  return debouncedValue;
}
