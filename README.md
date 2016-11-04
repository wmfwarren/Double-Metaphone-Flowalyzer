# Flowalyzer Using Double Metaphone

## The Algorithm
The Metaphone Algorithm was developed by Lawrence Phillips to phonetically encode the way words sound with common letters. In the original algorithm, the words "Kline" and "Cline" result in the same code.

In the Double Metaphone each word results in a primary and secondary encoding. This program only uses a primary encoding, but it uses other features of the Double Metaphone. 

The source code for the Double Metaphone JavaScript implementation used is take from [Titus Wormer's](https://github.com/wooorm) NPM package. It was been modified to account for the vowels in words, something the actual algorithm removes. The is important because of how important vowel sounds are in rhyming. 

## The Goal
The primary goal of this project is to analyze some of the quantifiable data surrounding flows for a selection of rappers. Some of the quantities that the app looks at are: 

+ Length of flows
+ Unique words in flows
+ Length of words in flows
+ Phonetic versions of flows

The long term goal of this project to to use the Metaphone Algorithm to see how dense rhyming syllables are in different flows. As well as:

+ Line length
+ Skews in word length and line length
+ Trends in the quantities by decade
+ Vocabulary
+ Correlations between existing measured quantities

## Technologies Used
+ NodeJS
+ Express
+ PostgreSQL
+ Angular 1.X





 
