"use strict";

const cleanerDriver = require("../textCleanDriver.js");
const flatten = require("../flatten.js");
const doubleMetaphone = require("../doubleMetaphone.js");

let fullFlow = `It's probably been twelve years since my father left, left me fatherless
And I just used to say I hate him in dishonest jest
When honestly I miss this nigga, like when I was six
And every time I got the chance to say it I would swallow it
Sixteen, I'm hollow, intolerant, skip shots
I storm that whole bottle, I'll show you a role model
I'm drunk, pissy, pissing on somebody front lawn
Trying to figure out how and when the fuck I missed moderate
Momma often was offering peace offerings
Think, wheeze cough, scoffing and he's off again
Searching for a big brother, Tyler was that
And plus he liked how I rap, the blunted mice in the trap
Too black for the white kids, and too white for the blacks
From honor roll to cracking locks up off them bicycle racks
I'm indecisive, I'm scatterbrained, and I'm frightened, it's evident
And them eyes, where he hiding all them icicles at?`;

const fullDMPFlow = [];

fullFlow = cleanerDriver(fullFlow);
fullFlow = flatten(fullFlow);

for(let i = 0; i < fullFlow.length; i++) {
	let DMPWord = doubleMetaphone(fullFlow[i]);
	fullDMPFlow.push(DMPWord);
}

console.log("DMPed Flow", fullDMPFlow );




