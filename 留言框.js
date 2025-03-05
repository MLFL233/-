// script.js
const form = document.getElementById('messageForm');
const tableBody = document.querySelector('#messageTable tbody');
// 保存数据
function saveMessage(name, message, time) {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push({ name, message, time });
  localStorage.setItem('messages', JSON.stringify(messages));
}
// 加载数据
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.forEach(msg => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${msg.name}</td>
      <td>${msg.message}</td>
      <td>${msg.time}</td>
    `;
    tableBody.appendChild(newRow);
  });
}
// 页面加载时加载数据
window.addEventListener('load', loadMessages);
// 表单提交事件
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('messageInput').value.trim();
  if (name && message) {
    const time = new Date().toISOString().slice(0, 10); // 格式：YYYY-MM-DD HH:MM:SS
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${message}</td>
      <td>${time}</td>
    `;
    tableBody.appendChild(newRow);
    saveMessage(name, message, time); // 保存数据
    form.reset();
  } else {
    alert('请填写姓名和留言！');
  }
});
