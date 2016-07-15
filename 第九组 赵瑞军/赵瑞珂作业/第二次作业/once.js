/**
 * Created by Administrator on 2016/7/12 0012.
 */
function Event(){
    this.events={}
    this.events.once={}
}
Event.prototype.on=function(eventName,callback){
    if(this.events[eventName])
    {this.events[eventName].push(callback)}
    else{
        this.events[eventName]=[callback]
    }
}
Event.prototype.once=function(eventName,callback){

    if(this.events.once){
        if(this.events.once[eventName])
        {
            this.events.once[eventName].push(callback)

        }
        else{
            this.events.once[eventName]=[]
            this.events.once[eventName].push(callback)

        }
    }
}
Event.prototype.remove=function(eventName,callback){

    var event=this.events[eventName]
    var onceEvent=this.events.once[eventName]
    //if(this.events[eventName])
    //{  this.events[eventName]=this.events[eventName].forEach(function(item){
    //    console.log(callback)
    //    return item!=callback
    //})}
    //console.log(this.events[eventName])

    if(this.events[eventName]){
        var newOnce=[]
        for(var i=0;i<this.events[eventName].length;i++){
            if(this.events[eventName][i]!=callback){
                newOnce.push(this.events[eventName][i])
            }
        }
        this.events[eventName]=newOnce
    }

    //this.events.once[eventName]=onceEvent.forEach(function(item){
    //    return item!=callback
    //})
    if(onceEvent){
        var newOnce=[]
        for(var i=0;i<onceEvent.length;i++){
            if(onceEvent[i]!=callback){
                newOnce.push(onceEvent[i])
            }
        }
        this.events.once[eventName]=newOnce
    }

}

Event.prototype.run=function(eventName){

    var args=[].slice.call(arguments,1)
    var event=this.events[eventName]
    var onceEvent=this.events.once[eventName]
    var _this=this
    if(event){
        event.forEach(function(item){
            item.call(_this,args)

        })
    }
    if(this.events.once[eventName]){
        this.events.once[eventName].forEach(function(item){
            item.call(_this,args)
            _this.remove(eventName,item)
        })
    }
}



var ev=new Event()
function cry(who){
    console.log(who+'cry')
}
function play(who){
    console.log(who+'play')
}

ev.once('girl',cry)
ev.on("girl",play)
//ev.on("girl",cry)
//ev.remove('girl',cry)
//ev.remove('girl',play)


ev.run('girl',"xxx")
ev.run('girl','xxx')
ev.run('girl','xxx')


