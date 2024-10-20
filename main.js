document.getElementById('myForm').onsubmit = function(event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value;
  const paypayLink = document.getElementById('paypayLink').value;

  // PythonのFlaskサーバーのエンドポイントにデータを送信
  fetch('http://localhost:5000/process_purchase', {
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