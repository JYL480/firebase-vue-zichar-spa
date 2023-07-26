// Bacsiaclyy this is this bus is to so that some other elements will not the some button has been triggered,
// emit some event out from deep insidfe the component 
// emit events globaly, so that other components can know that this event has occured

const events = new Map(); // Map to keep track all the events

export default {
    $on(eventName,fn){ // listen for events 
        if(!events.has(eventName)){ //Check if there is a key for the event name, if not you will create one 

            events.set(eventName,[])
        }

        events.get(eventName).push(fn); // Push the function into the array which you wan tto listen for
    },

    $off(eventName,fn){ // 
        throw {message:'Not Implemented'}
    },
    $emit(eventName,data){ // To emit the event 
        if(events.has(eventName)){
            events.get(eventName).forEach(fn => fn(data)); // If there is an event in the array , you will carry out the function, hence emitting
        }

    }
}