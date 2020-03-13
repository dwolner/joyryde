<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center">
                <div class="full-width q-pa-md" style="max-width: 750px;">
                    <q-img class="q-my-md" src="statics/joyryde_logo.png"></q-img>

                    <div class="q-py-md flex flex-center">
                        <div style="width: fit-content;" class="q-pa-sm" align="center">
                            <h6 class="uppercase text-white">
                                {{ countdownStats.daysLeft }} 
                            </h6>
                            <h6 class="uppercase text-white">
                                {{ countdownStats.daysLeft > 1 ? 'days' : 'day' }}
                            </h6>
                        </div>

                        <div style="width: fit-content;" class="q-pa-sm" align="center">
                            <h6 class="uppercase text-white">
                                {{ countdownStats.hoursLeft }} 
                            </h6>
                            <h6 class="uppercase text-white">
                                {{ countdownStats.hoursLeft > 1 ? 'hours' : 'hour' }}
                            </h6>
                        </div>

                        <div style="width: fit-content;" class="q-pa-sm" align="center">
                            <h6 class="uppercase text-white">
                                {{ countdownStats.minutesLeft }}
                            </h6>
                            <h6 class="uppercase text-white">
                                {{ countdownStats.minutesLeft > 1 ? 'mins' : 'min'  }}
                            </h6>
                        </div>

                        <div style="width: fit-content;" class="q-pa-sm" align="center">
                            <h6 class="uppercase text-white">
                                {{ countdownStats.secondsLeft }}
                            </h6>
                            <h6 class="uppercase text-white">
                                {{ countdownStats.secondsLeft > 1 ? 'secs' : 'sec'  }}
                            </h6>
                        </div>
                    </div>

                    <div class="full-width q-py-md">
                        <q-img src="statics/BRAVE_COVER.png"></q-img>
                    </div>

                    <div class="full-width q-py-md">
                        <q-form @submit="onSubmit" @reset="onReset" class="row" invert>
                            <q-input v-model="email" type="email" dark color="white" class="col-xs-12 moki-soft" dense inverted filled fill-mask lazy-rules label="Your email" />

                            <q-btn label="Get notified" type="submit" class="full-width moki-soft" style="background: #ee1d3c; color: #fff;" />
                        </q-form>
                    </div>

                    <div class="full-width q-py-md">
                        <q-btn label="Pre Save Music" type="submit" class="full-width moki-soft" style="background: #2cce5f; color: #fff;" @click="openPresave()" />
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    name: 'MainLayout',

    components: {},

    data() {
        return {
            leftDrawerOpen: false,
            email: '',
            unixTimestamp: 1585886400000,
            countdownStats: {
                daysLeft: null,
                hoursLeft: null,
                minutesLeft: null,
                secondsLeft: null,
            }
        }
    },

    methods: {

        openPresave() {
            window.open('https://hardrecs.ffm.to/bravelp', '_blank')
        },

        onSubmit() {
            // email richard and steve
            let req = {
                email: this.email,
            }

            // this.api.post('https://richardelias.com/api/contact', req, res => {
            //     console.log('contact res: ', res)

            //     if (res.success) {
            //         this.conciergeFormSuccess = true
            //         this.conciergeFormFail = false
            //         this.onReset()

            //         this.setTimeout(() => {
            //             this.$root.$emit('showContactFormOverlay', false)
            //         }, 3000)
            //     } else {
            //         // error
            //         this.conciergeFormSuccess = false
            //         this.conciergeFormFail = true
            //     }
            // })
        },

        onReset() {
            this.email = ''
        },

        countdown(endDate, cb) {
            let days, hours, minutes, seconds

            endDate = new Date(endDate).getTime()
            console.log('COUNTDOWN: ', endDate)

            if (isNaN(endDate)) {
                return false
            }

            let retObj

            let countdownInterval = setInterval(() => {
                let startDate = new Date()
                startDate = startDate.getTime()

                let timeRemaining = parseInt((endDate - startDate) / 1000)
                // console.log('countdown timeRemaining: ', timeRemaining)

                if (timeRemaining >= 0) {
                    days = parseInt(timeRemaining / 86400)
                    timeRemaining = timeRemaining % 86400

                    hours = parseInt(timeRemaining / 3600)
                    timeRemaining = timeRemaining % 3600

                    minutes = parseInt(timeRemaining / 60)
                    timeRemaining = timeRemaining % 60

                    seconds = parseInt(timeRemaining)

                    retObj = {
                        days: parseInt(days, 10),
                        hours: ('0' + hours).slice(-2),
                        minutes: ('0' + minutes).slice(-2),
                        seconds: ('0' + seconds).slice(-2),
                    }
                    // console.log('retObj: ', retObj)

                    cb(retObj)
                } else {
                    cb(false)
                    clearInterval(countdownInterval)
                    return false
                }
            }, 1000)
        },
    },

    created() {
        this.countdown(this.unixTimestamp, countdownStats => {
            if (countdownStats) {
                this.countdownStats = {
                    daysLeft: countdownStats.days,
                    hoursLeft: countdownStats.hours,
                    minutesLeft: countdownStats.minutes,
                    secondsLeft: countdownStats.seconds,
                }
            }
        })
    },
}
</script>
