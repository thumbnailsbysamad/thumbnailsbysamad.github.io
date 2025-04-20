function openModal(src) {
  const modal = document.getElementById("previewModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("previewModal").style.display = "none";
}
