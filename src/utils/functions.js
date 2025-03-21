
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES');
}

export function formatFileSize(size) {
  if (size < 1024) {
    return size + ' bytes';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
