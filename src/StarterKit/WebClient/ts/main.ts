import { Greeting } from 'Greeting';

class Greeter {

    greeting: Greeting;

    constructor(greeting: Greeting) {
        this.greeting = greeting;
    }

    say(text: string) {
        console.log(text + ' ' + this.greeting.getHello());
    }

};

var greeting = new Greeting();
var greeter = new Greeter(greeting);
greeter.say('Hello');
