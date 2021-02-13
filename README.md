[![Build Status](https://travis-ci.org/mikezentz/voice-foundry.svg?branch=main)](https://travis-ci.org/mikezentz/voice-foundry) [![Repo Size](https://img.shields.io/github/repo-size/mikezentz/voice-foundry?style=flat)](https://github.com/mikezentz/voice-foundry) [![Contributors](https://img.shields.io/github/contributors/mikezentz/voice-foundry?style=flat)](https://github.com/mikezentz/voice-foundry/graphs/contributors)

# Junior Development Project

Try it Out! Call:  **_213-335-7177_**

Additions: I set up unit testing with mocha, chai, and travis ci.  I also added
an option in the contact flow to have the vanity numbers texted to your phone
using Amazon Pinpoint. I've included screenshots of the [contact flow](https://github.com/mikezentz/voice-foundry/raw/main/docs/img/contactflow.png) and
[DynamoDB table](https://github.com/mikezentz/voice-foundry/raw/main/docs/img/dynamodb.png).

Each day while working on this project I recorded a sub-3-minute video of my
thoughts on what I was working on that day.
- [Day 1](https://github.com/mikezentz/voice-foundry/raw/main/docs/journal/Day1.m4v)
- [Day 2](https://github.com/mikezentz/voice-foundry/raw/main/docs/journal/Day2.m4v)
- [Day 3](https://github.com/mikezentz/voice-foundry/raw/main/docs/journal/Day3.m4v)
- [Day 4](https://github.com/mikezentz/voice-foundry/raw/main/docs/journal/Day4.m4v)


> Record your reasons for implementing the solution the way you did, the struggles you faced and problems you overcame.

My solution was to generate a dialpad key for every word in the English language
and do a simple find and replace in a loop.  Then I prioritized the numbers that
had the most English characters replaced and called that "Best".  In cases where
there were no English words matched in a number pattern I substituted random
characters. This was to satisfy the constraints of the project.  My personal
preference would have been to just return, "Sorry mate your number just isn't
interesting". To make the project a little more interesting I scraped all of the
obscure and endangered words maintained at [The Phontistery](http://phrontistery.info/)
and prioritized those over regular English words.  So the order of precedence
goes like this.
  1. numbers replaced with obscure words
  2. numbers replaced with standard words
  3. numbers replaced with nonsense

At the start of this project I had not worked with AWS Lambda, Connect, or
DynamoDB.  I focused on learning and implementing one each day in order to give
myself time to study, experiment, and hopefully get it working in production. My
thinking was that if I could do one a day that would leave me a few days to test
functionality and add some bonus features.

In order to overcome my knowledge gap I used the official AWS documentation,
lots of random results to queries on DuckDuckGo and some very good YouTube
tutorials.  Special thanks to [Cloud Path](https://www.youtube.com/watch?v=ijyeE-pXFk0)
for this very helpful DynamoDB walk-through.

> What shortcuts did you take that would be a bad practice in production?

While researching to do this project I found out that there are ways to push
your code into Amazon programmatically.  I would like to learn how to do this as
it seems this is how most AWS developers probably work.  What I did instead was
write most of my code in Atom and then copy and paste it into the Lambda editor
on the AWS console.

> What would you have done with more time? We know you have a life. :-)

It would be neat to design the vanity number algorithm to use two word phrases
that match some sort of pattern.  For instance verb then noun, or something
similar.  The goal of a vanity number is memorability and inserting a word into
the number somewhere only makes for a memorable vanity number by accident and
not by design.
