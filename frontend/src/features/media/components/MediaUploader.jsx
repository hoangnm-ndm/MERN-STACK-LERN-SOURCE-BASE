import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useMediaUpload } from '../hooks/useMediaUpload';
import { Button } from '@/shared/components/ui/Button';

/**
 * Vùng kéo-thả để tải ảnh vào thư viện (Phase 12).
 *
 * @param {object} props
 * @param {string | null} props.folderId thư mục đích
 */
export function MediaUploader({ folderId }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const { upload, isUploading, progress } = useMediaUpload({ kind: 'LIBRARY', folderId });

  // TODO:
  // - Vùng thả: cần CẢ BỐN handler, thiếu một là hỏng:
  //     onDragOver:  event.preventDefault()  ← BẮT BUỘC, không có thì onDrop
  //                                             không bao giờ chạy (trình duyệt
  //                                             sẽ mở file trong tab mới)
  //     onDragEnter: setIsDragging(true)
  //     onDragLeave: setIsDragging(false)
  //     onDrop:      preventDefault + setIsDragging(false) + xử lý
  //                  event.dataTransfer.files
  // - Vùng thả KHÔNG thay thế được nút bấm: phải có thêm <button> mở input file,
  //   vì kéo-thả không dùng được bằng bàn phím và trên điện thoại.
  // - Nhiều file: gọi upload lần lượt (for...of với uploadAsync) thay vì
  //   Promise.all — mỗi file là một presigned URL riêng, upload song song hàng
  //   chục file sẽ làm nghẽn đường truyền của người dùng.
  // - Hiện danh sách file đang lên kèm tiến độ và trạng thái từng file.
  // - Ghi rõ giới hạn ngay trên giao diện: "PNG, JPG, WebP, GIF — tối đa 5MB".
  return null;
}
