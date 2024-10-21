document.getElementById('myForm').onsubmit = function(event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value;
  const paypayLink = document.getElementById('paypayLink').value;

  // PythonのFlaskサーバーのエンドポイントにデータを送信
  fetch('https://paypayreceive.onrender.com/process_purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      paypayLink: paypayLink
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('サーバーエラーが発生しました');
    }
  })
  .then(data => {
    // 成功時の処理（thanks.htmlへのリダイレクト）
    //window.location = 'thanks.html';
    alert(data.message);
  })
  .catch(error => {
    // 失敗時の処理
    alert('エラーが発生しました: ' + error.message);
  });

  return false; // Prevent default form submission
};

function showModal() {
  document.getElementById('myModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

window.onclick = function(event) {
  var modal = document.getElementById('myModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

document.getElementById('myForm').addEventListener('submit', function(event) {
  var submitButton = document.querySelector('.formbold-btn');
  var overlay = document.createElement('div');
  
  // ボタンを無効化して連続クリックを防止
  submitButton.disabled = true;
  submitButton.value = '処理中...';

  // 簡易的な待機画面の表示
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.color = '#fff';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.fontSize = '18px';
  overlay.innerHTML = '処理中です。しばらくお待ちください...';

  document.body.appendChild(overlay);
});