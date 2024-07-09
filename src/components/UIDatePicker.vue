<template>
	<div class="ui-date-picker-c">
		<div class="ui-date-picker-wrapper">
			<div>
				<div class="calendar">
				<div class="header">
					<button class="nav-button" @click="onClickToLeft">&lt;</button>
					<span class="current-date">{{ dateHolder }}</span>
					<button class="nav-button" @click="onClickToRight">&gt;</button>
				</div>
				<ul class="weekdays">
					<template v-for="(weekday, index) in weekdays" :key="index">
						<li> {{ weekday }}</li>
					</template>
				</ul>
				<ul class= "days">
					<!-- <template v-for="(day, index) in daysInMonth" :key="index"> -->
						<li
						v-for="(day, index) in daysInMonth" :key="index"
						:class="{
						'not-current-month': !day.isCurrentMonth,
						'selected':day.isSelected,
						'past-date': isPastDate(day.date),
                        'is-today': day.isToday
						}" 
						@click="selectDate(day.date)"
						>
					
						{{ day.date.date() }}

					</li>
						<!-- <li> {{ day }}</li> -->
					<!-- </template> -->
				</ul>
			</div>
		
			
			</div>
			
			</div>
		   
		</div>

</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
export default {
	name: "UIDatePicker",
	data() {
		return {
			weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
			selectedDate: dayjs(),
			daysInMonth: [],
			TodaysDate: null
		}
	},
	methods: {

		totalDaysInMonth() {

			this.daysInMonth = [];
			const startOfMonth = this.selectedDate.startOf('month');
			const endOfMonth = this.selectedDate.endOf('month');
			const offsetValue = (startOfMonth.day() + 6) % 7;
            const endOffsetValue = (7-(this.daysInMonth.length % 7)) % 7
            let today = dayjs().format('D');

			for (let i = 0; i < offsetValue; i++) {
				this.daysInMonth.push({ date: startOfMonth.subtract(offsetValue - i, 'day'), isCurrentMonth: false, isToday: false });
				
			}

			for (let i = 0; i < endOfMonth.date(); i++) {
                const date = dayjs(new Date(this.selectedDate.year(), this.selectedDate.month(), i + 1));
                this.daysInMonth.push({ date: date, isCurrentMonth: true, isSelected: this.isSelected(date), isPast: this.isPastDate(date), isToday: Number(today) === i + 1 && this.currentMonth() === dayjs().format('MMMM') && this.currentYear() === dayjs().format('YYYY') });
            }

			

			for (let i = 1; i <  endOffsetValue; i++) {
				
				this.daysInMonth.push({ date: endOfMonth.add(i, 'day'), isCurrentMonth: false, isToday: false });

			}
			
			console.log(this.daysInMonth)

		},
		onClickToRight() {
			this.selectedDate = this.selectedDate.add(1, 'month');
			this.totalDaysInMonth(); 
		},
		onClickToLeft() {
			this.selectedDate = this.selectedDate.subtract(1, 'month');
			this.totalDaysInMonth(); 
		},
		currentMonth() {
			return this.selectedDate.format('MMMM');
		},
		currentYear() {
			return this.selectedDate.format('YYYY');
		} ,
		//geçmiş gunleri çekmek için method denemesi 
		  isPastDate(date) {
	 		return date.isBefore(dayjs(), 'day');
		},
        selectDate(date) {
			if (!this.isPastDate(date) && !date.isBefore(this.selectedDate.startOf('month'), 'day')) {
				this.TodaysDate = date;
				this.totalDaysInMonth();
			}
		},
        isSelected(date) {
            return this.TodaysDate && this.TodaysDate.isSame(date, 'day');
        }
	},
	computed: {
		dateHolder() {
			return this.currentMonth() + " " + this.currentYear();
		}
	},
	created() {
		this.totalDaysInMonth();
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables.scss';

.ui-date-picker-c {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	
	.ui-date-picker-wrapper {
		background: #FFFFFF;
		box-shadow: 2px 2px 6px #5C75991A;
		border: 1px solid #E6E6E6;
		border-radius: $border-radius-medium;
		opacity: 1;
		width: 270px;
		height: 240px;
		display: flex;
		flex-direction: column;
		align-items: center;
		

		.calendar {
			padding-top: 1rem;
			width: 100%;
			justify-content: space-around;
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.nav-button {
					background-color: transparent;
					border: none;
					font-size: 1.2rem;
					font-family: 'Arial';
					cursor: pointer;
				}
				.current-date {
					font-size: 0.9rem;
					font-weight: 500;
				}
			}
		}
		
		.weekdays, .days {
			list-style: none;
			padding: 0;
			margin: 0;
			width: 100%;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			text-align: center;
			font-size: 10px;
		}
		
		.weekdays {
			padding-top: 20px;
			font-weight: 700;
			color: #363636;
			opacity: 0.7;
		}
		.days{
			padding-top: 6px;
            .is-today{
                background: #f0f0f0;
                border-radius: 100%;
            }

		}
		.days li{
			padding: 10px 9px;
			line-height: 5px;
			//transition: background-color 0.2s;

			//past date rengi
			&.past-date {
				color: grey;
				text-decoration: line-through;
				pointer-events: none;
			}

			&.selected {
				background-color: $accent-primary-color;
                color: #fff;
                border-radius: 50%;
            }
		}

	}
}
</style>