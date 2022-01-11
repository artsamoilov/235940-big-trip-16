import {TripEventType} from '../utils/const.js';
import {countTripEventsMoney, countTripEventsQuantityByType, countTripEventsTimeByType, formatChartTime} from '../utils/trip-event.js';
import SmartView from './smart-view.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderMoneyChart = (moneyCtx, tripEvents) => {
  const tripEventsTypes = Object.keys(TripEventType);
  const tripEventsMoneyCounts = tripEventsTypes.map((type) => countTripEventsMoney(tripEvents, type));
  const sortedTripEventsMoneyCounts = tripEventsMoneyCounts.sort(({totalMoney: moneyA}, {totalMoney: moneyB}) => moneyB - moneyA);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTripEventsMoneyCounts.map(({eventType}) => eventType),
      datasets: [{
        data: sortedTripEventsMoneyCounts.map(({totalMoney}) => totalMoney),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, tripEvents) => {
  const tripEventsTypes = Object.keys(TripEventType);
  const tripEventsQuantityCounts = tripEventsTypes.map((type) => countTripEventsQuantityByType(tripEvents, type));
  const sortedTripEventsQuantityCounts = tripEventsQuantityCounts.sort(({totalQuantity: quantityA}, {totalQuantity: quantityB}) => quantityB - quantityA);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTripEventsQuantityCounts.map(({eventType}) => eventType),
      datasets: [{
        data: sortedTripEventsQuantityCounts.map(({totalQuantity}) => totalQuantity),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, tripEvents) => {
  const tripEventsTypes = Object.keys(TripEventType);
  const tripEventsTimeCounts = tripEventsTypes.map((type) => countTripEventsTimeByType(tripEvents, type));
  const sortedTripEventsTimeCounts = tripEventsTimeCounts.sort(({totalTime: timeA}, {totalTime: timeB}) => timeB - timeA);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTripEventsTimeCounts.map(({eventType}) => eventType),
      datasets: [{
        data: sortedTripEventsTimeCounts.map(({totalTime}) => totalTime),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${formatChartTime(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createTripStatistics = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>`
);

export default class TripStatisticsView extends SmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(tripEvents) {
    super();

    this._data = tripEvents;

    this.#setCharts();
  }

  get template() {
    return createTripStatistics();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  }

  restoreHandlers = () => this.#setCharts();

  #setCharts = () => {
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    const BAR_HEIGHT = 55;
    const chartHeight = BAR_HEIGHT * Object.keys(TripEventType).length;
    moneyCtx.height = chartHeight;
    typeCtx.height = chartHeight;
    timeCtx.height = chartHeight;

    this.#moneyChart = renderMoneyChart(moneyCtx, this._data);
    this.#typeChart = renderTypeChart(typeCtx, this._data);
    this.#timeChart = renderTimeChart(timeCtx, this._data);
  }
}
