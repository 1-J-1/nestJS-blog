import * as dayjs from 'dayjs';

export const nowDatetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
export const weekAgoDatetime = dayjs().subtract(1,'weeks').format('YYYY-MM-DD HH:mm:ss');