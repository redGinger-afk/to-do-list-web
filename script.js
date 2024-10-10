function addTask() {
  let taskInput = document.getElementById("taskInput")
  let taskValue = taskInput.value.trim()

  if (taskValue !== "") {
    let li = document.createElement("li")

    // Span untuk teks tugas
    let taskText = document.createElement("span")
    taskText.textContent = taskValue

    // Tombol hapus
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "🗑️"
    deleteBtn.className = "delete"
    deleteBtn.onclick = function () {
      li.remove()
    }

    // Tombol edit
    let editBtn = document.createElement("button")
    editBtn.textContent = "✏️"
    editBtn.className = "edit"
    editBtn.onclick = function () {
      editTaskInline(li, taskText, editBtn)
    }

    li.appendChild(taskText)
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)
    document.getElementById("taskList").appendChild(li)

    taskInput.value = "" // Kosongkan input setelah menambahkan tugas
  }
}

// Fungsi untuk mengedit tugas langsung di dalam daftar
function editTaskInline(li, taskText, editBtn) {
  let currentText = taskText.textContent
  taskText.style.display = "none" // Sembunyikan teks tugas

  // Membuat input baru untuk mengedit tugas
  let inputEdit = document.createElement("input")
  inputEdit.type = "text"
  inputEdit.value = currentText
  li.insertBefore(inputEdit, taskText) // Masukkan input sebelum span teks

  // Membuat tombol simpan
  let saveBtn = document.createElement("button")
  saveBtn.textContent = "✔️"
  saveBtn.className = "save"
  saveBtn.onclick = function () {
    let newValue = inputEdit.value.trim()
    if (newValue !== "") {
      taskText.textContent = newValue
      taskText.style.display = "inline" // Tampilkan teks setelah disimpan
      inputEdit.remove() // Hapus input setelah menyimpan
      saveBtn.remove() // Hapus tombol simpan
      editBtn.style.display = "inline" // Tampilkan tombol edit kembali
    }
  }

  li.insertBefore(saveBtn, editBtn) // Tambahkan tombol simpan

  editBtn.style.display = "none" // Sembunyikan tombol edit
}

// Menandai tugas sebagai selesai
document.getElementById("taskList").addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed")
  }
})
