# Flowalyzer Using Double Metaphone

## Marshall Friskics-Warren

## The Algorithm
The Metaphone Algorithm was developed by Lawrence Phillips to phonetically encode the way words sound with common letters. In the original algorithm, the words "Kline" and "Cline" result in the same code.

In the Double Metaphone each word results in a primary and secondary encoding. This program only uses a primary encoding, but it uses other features of the Double Metaphone. 

The source code for the Double Metaphone JavaScript implementation used is take from [Titus Wormer's](https://github.com/wooorm) NPM package. It was been modified to account for the vowels in words, something the actual algorithm removes. The is important because of how important vowel sounds are in rhyming. 

## The Goal
The goal of this project is to use the Double Metaphone Algorithm to analyze the lyrics of rappers and figure you who has the dopest flows. 

## Technologies Used
+ NodeJS
+ Hapi
+ PostgreSQL
+ Angular 1.X





 
