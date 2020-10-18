function testFunctionOGL(){
    console.log("LMAO")
    /*$.ajax('https://reqres.in/api/users?page=2')
    .done(function(){
        alert("complete ajax")
    })*/
    var sceneArr = ['50D6687D85C2D44F942A99466486726472C6', '0DE28E2A67DBC446344BBE98BB088E08CE7D']
    const randomElement = sceneArr[Math.floor(Math.random() * sceneArr.length)];
    //GameManager.variableStore.persistentStrings[001] = randomElement
    console.log('Random Scene', randomElement)
    GameManager.variableStore.strings[0] = randomElement
    GameManager.variableStore.persistentStrings[0] = randomElement
     GameManager.variableStore.localStrings[0] = randomElement
    console.log('global',GameManager.variableStore.strings[0])
    console.log('local',GameManager.variableStore.strings[0])
    console.log('persistent',GameManager.variableStore.persistentStrings[0])
}