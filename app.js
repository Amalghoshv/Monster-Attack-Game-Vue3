
function damageValue(min,max){
    return Math.floor(Math.random() * (max-min)) + min
}

const app =Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound : 0,
            winner : null,
            logMessages:[]
        }
    },
    watch:{
        playerHealth(value){
            if(value <=0 && this.monsterHealth <= 0){
                //draw
                this.winner = 'draw'
            }else if(value<=0){
                //player lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth <= 0){
                //draw
                this.winner = 'draw'

            }else if(value<=0){
                //monster lost
                this.winner = 'player'

            }
        }
    },
    computed:{
        monsterBarStyle(){
            if(this.monsterHealth < 0){
                return {width : '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyle(){
            if(this.playerHealth< 0){
                return { width : '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        specialAttackCondition(){
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        startGame(){
            this.playerHealth =100,
            this.monsterHealth = 100,
            this.currentRound = 0,
            this.winner =null,
            this.logMessages = []

        },
        attackMonster(){
          this.currentRound++
          const damage = damageValue(5,12)
          this.monsterHealth -= damage;
          this.addLogMessages('player', 'attack', damage);
          this.attackPlayer()
        },
        attackPlayer(){
            const damage = damageValue(8,15)
            this.playerHealth -=damage;
            this.addLogMessages('monster', 'attack', damage)

        },
        specialMonsterAttack(){
            this.currentRound++;
            const damage =damageValue(10,25)
            this.monsterHealth -=damage;
            this.addLogMessages('player', 'special-attack', damage)
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            healValue= damageValue(10,20)
            if(this.playerHealth + healValue >100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.addLogMessages('player', 'heal', healValue)
            this.attackPlayer();
            

        },
        surrender(){
            this.winner = 'monster';
            this.playerHealth = 0
        },
        addLogMessages(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            })

        }
    },  
})

app.mount('#game')