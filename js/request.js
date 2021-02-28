$('form').submit(function() {
    // для читаемости кода
    var $form = $(this);

    // чистим ошибки
    $form.find('.error').remove();

    // проверяем поле с именем пользователя
    if ($form.find('input[name=firstname]').val() === '') {
        // добавляем текст ошибки
        $form.find('input[name=firstname]')
          .before('<div class="error">Введите имя</div>');
        // прерываем дальнейшую обработку
        return false;
    }

    // всё хорошо – отправляем запрос на сервер
    $.post(
        $form.attr('action'), // ссылка куда отправляем данные
        alert($form.serialize())     // данные формы
    );

    // отключаем действие по умолчанию
    return false;
});

firebase.initializeApp({
  apiKey: 'AIzaSyAVlZBAEho-bBIgdrwT4UJMwdKpOPwYtS4',
  projectId: 'nur-gis'
});

const db = firebase.firestore();

const data2 = {};
data2.address = "Бульвар НУРЖОЛ, 14";
data2.big_img = "https://sputniknews.kz/images/547/76/5477693.jpg";
data2.category = "adults"; 

const data1 = {address: "Бульвар НУРЖОЛ, 15",
big_img: "https://sputniknews.kz/images/547/76/5477693.jpg",
category: "adults"}; 

//console.log('data1', data1);

function addPlace() {
    
  console.log('data1', data1);
  var collection = db.collection('places');
  return collection.add(data1);
};
// const id = 'baiterek';
async function getPlace(id) {

    var b = await db.collection('places').doc(id).get();
    console.log(b._document.proto.fields)
    console.log(b)

}