#!/usr/bin/env node
import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner"; 

let playername;
const sleep = (ms=2000) => new Promise((r)=> setTimeout(r,ms))
async function welcome(){
    const rainbowtitle = chalkAnimation.rainbow(
        `Who want to be the javascript millionare ?`
    );
    await sleep();
    rainbowtitle.stop();
    console.log(`
    ${chalk.bgBlue('How to play')}
    Select the options below
    If you win you get one million otherwise you die
    `);
}
async function askname(){
    const answers = await inquirer.prompt({
        name:'Player_name',
        type:'input',
        message: 'What is your name',
        default(){
            return 'player'
        }
    })
    playername = answers.Player_name
}
async function question(){
    const answer = await inquirer.prompt({
        name:'question_1',
        type:'list',
        message:'Is your Freinds know you are mad ? \n',
        choices:[
            'YES', 'NO', 'I DONT KNOW'
        ]
    })
    return handleAnswers(answer.question_1 == 'YES')
}
async function handleAnswers(isCorrect){
    const spinner = createSpinner('checking answer').start();
    await sleep();
    if (isCorrect) {
        spinner.success({text:`Nice work ${playername}`})
        winner()
    }else{
        spinner.error({text:`You die`})
        process.exit(1)
    }
}
function winner(){
    console.clear()
    const msg = `Congrats, ${playername} ! \n You won $ 1  000 000`
    figlet(msg,(err,data)=>{
        console.log(gradient.instagram.multiline(data));
    })
}
await welcome()
await askname()
await question()