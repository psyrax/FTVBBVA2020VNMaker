function shuffleFTV(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


var formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function gameSetupFTV(){
   
    /*$.ajax('https://reqres.in/api/users?page=2')
    .done(function(){
        alert("complete ajax")
    })*/
    var sceneArr = [
        '50D6687D85C2D44F942A99466486726472C6', 
        '0DE28E2A67DBC446344BBE98BB088E08CE7D'
    ];
    var shuffleArr = sceneArr;
    shuffleArr.unshift(1, 'siguiente escena');
    shuffleArr.forEach(function(scene, index){
        GameManager.variableStore.persistentStrings[index] = scene;
    });
    var newMoney = 15000;
    GameManager.variableStore.numbers[0] = newMoney;
    GameManager.variableStore.numbers[2] = 0;
    GameManager.variableStore.persistentNumbers[0] = newMoney;
    GameManager.variableStore.strings[1] = formatter.format(newMoney);
}

function setNextSceneFTV(){
    var currentScene =  GameManager.variableStore.persistentStrings[0];
    var nextScene = currentScene + 1;
    var nextSceneID;
    if ( nextScene > 3 ){
        nextSceneID = 'D5D18CE81A931142A54BFAC0A8E2A1111A2C';
    } else {
        nextSceneID = GameManager.variableStore.persistentStrings[nextScene];   
    }
    GameManager.variableStore.persistentStrings[1] =  nextSceneID;
    GameManager.variableStore.strings[0] =  nextSceneID;
    GameManager.variableStore.persistentStrings[0] = nextScene;
}

function changeMoney(){
    var currentMoney = GameManager.variableStore.numbers[0];
    var deductMoney = GameManager.variableStore.numbers[2];
    var newMoney = currentMoney + deductMoney;
    GameManager.variableStore.numbers[0] = newMoney;
    GameManager.variableStore.numbers[2] = 0;
    GameManager.variableStore.persistentNumbers[0] = newMoney;
    GameManager.variableStore.strings[1] = formatter.format(newMoney);
    
}

