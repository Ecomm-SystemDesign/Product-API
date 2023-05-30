import { sleep, check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { durations: '30s', target: 3000 },
    { duration: '30s', target: 3000 },
    { duration: '30s', target: 0 },
  ],
};


export default () => {
  const rand = Math.floor(Math.random() * 100000 + 840000);
  const res = http.get(http.url`http://localhost:3000/products/${rand}/related`);

  check(res, { 'status was 200': (r) => r.status === 200 });

  sleep(1);
};