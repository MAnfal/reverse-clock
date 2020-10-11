import LifeStats from '../data/life-stats.json';

export default {
    get data() {
        return LifeStats;
    },

    lifeInPercentage(gender) {
        const activityToLifeObject = {};
        let overAllLife = 0;

        Object.keys(this.data).forEach((activity) => {
            let numDays = this.data[activity].days;

            if (typeof numDays === 'object') {
                if (gender !== 'none') {
                    numDays = numDays[gender];
                } else {
                    let totalItems = 0;
                    let totalDays = 0;

                    Object.values(numDays).forEach((numDay) => {
                        totalDays += numDay;
                        totalItems += 1;
                    });

                    numDays = totalDays / totalItems;
                }
            }

            overAllLife += numDays;

            activityToLifeObject[activity] = numDays;
        });

        Object.keys(activityToLifeObject).forEach((activity) => {
            activityToLifeObject[activity] /= overAllLife;
        });

        return activityToLifeObject;
    }
};