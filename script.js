import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

// Define a list of product IDs to test against
const productIds = [1, 2, 3, 4, 5];

// export const options = {
//   vus: 100,
//   stages: [
//     { duration: '1m', target: 50 }, // Ramp-up period: increase to 50 virtual users in 1 minute
//     { duration: '3m', target: 100 }, // Stay at 100 virtual users for 3 minutes
//     { duration: '1m', target: 0 } // Ramp-down period: decrease to 0 virtual users in 1 minute
//   ]
// };
export const options = {
  vus: 100,
  duration: '30s'
}

export default function () {
  const randomIndex = Math.floor(Math.random() * productIds.length);
  const productId = productIds[randomIndex];
  const url = `http://localhost:3000/products/${productId}/styles`;

  const res = http.get(url); //makes the get request at the url provided with random ids
  sleep(1); //after the user makes a get request, he sleeps for 1 second
  check(res, {
    'is status 200': r => r.status === 200,
    'Return time < 2ms': r => r.timings.duration < 2,
    'Return time < 3ms': r => r.timings.duration < 3,
    'Return time < 5ms': r => r.timings.duration < 5,
    'Return time < 10ms': r => r.timings.duration < 10,
    'Return time < 20ms': r => r.timings.duration < 20,
    'Return time < 50ms': r => r.timings.duration < 50,
    'Return time < 60ms': r => r.timings.duration < 60,
    'Return time < 100ms': r => r.timings.duration < 100,
    'Return time < 200ms': r => r.timings.duration < 200,
    'Return time < 500ms': r => r.timings.duration < 500
  });

  requests.add(1); // keeps track of total number of requests made during the test
}
