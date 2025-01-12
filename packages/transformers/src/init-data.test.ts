import { describe, expect, it } from 'vitest';
import { parse } from 'valibot';

import { initDataQuery, serializeInitDataQuery } from '@/init-data.js';

describe('initData', () => {
  it('should properly create object from query', () => {
    const input = 'user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=-9019086117643313246&chat_type=sender&auth_date=1736362318&signature=JUPYm_qmf8hJYSux535eNDg_a5ZdcOkS6yZMkEUGS09zcXoIopCn3DOuNCa5aWH0PQGaUGGMAaq9MeaMg-6EBg&hash=14cd9c9eeebf82370b20f4df23af9439d00f6da2837dd20e17ed3b03ab99cd9c&additional_prop=1';
    const output = {
      auth_date: new Date(1736362318000),
      chat_instance: '-9019086117643313246',
      chat_type: 'sender',
      hash: '14cd9c9eeebf82370b20f4df23af9439d00f6da2837dd20e17ed3b03ab99cd9c',
      signature: 'JUPYm_qmf8hJYSux535eNDg_a5ZdcOkS6yZMkEUGS09zcXoIopCn3DOuNCa5aWH0PQGaUGGMAaq9MeaMg-6EBg',
      user: {
        allows_write_to_pm: true,
        first_name: 'Vladislav',
        id: 279058397,
        is_premium: true,
        language_code: 'ru',
        last_name: 'Kibenko',
        photo_url: 'https://t.me/i/userpic/320/4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg',
        username: 'vdkfrost',
      },
      additional_prop: '1',
    };

    expect(parse(initDataQuery(), input)).toStrictEqual(output);
    expect(parse(initDataQuery(false), input)).toStrictEqual(output);
  });

  it('should deeply camelize output if true is passed', () => {
    expect(
      parse(initDataQuery(true), 'user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=-9019086117643313246&chat_type=sender&auth_date=1736362318&signature=JUPYm_qmf8hJYSux535eNDg_a5ZdcOkS6yZMkEUGS09zcXoIopCn3DOuNCa5aWH0PQGaUGGMAaq9MeaMg-6EBg&hash=14cd9c9eeebf82370b20f4df23af9439d00f6da2837dd20e17ed3b03ab99cd9c&additional_prop=1'),
    ).toStrictEqual({
      authDate: new Date(1736362318000),
      chatInstance: '-9019086117643313246',
      chatType: 'sender',
      hash: '14cd9c9eeebf82370b20f4df23af9439d00f6da2837dd20e17ed3b03ab99cd9c',
      signature: 'JUPYm_qmf8hJYSux535eNDg_a5ZdcOkS6yZMkEUGS09zcXoIopCn3DOuNCa5aWH0PQGaUGGMAaq9MeaMg-6EBg',
      user: {
        allowsWriteToPm: true,
        firstName: 'Vladislav',
        id: 279058397,
        isPremium: true,
        languageCode: 'ru',
        lastName: 'Kibenko',
        photoUrl: 'https://t.me/i/userpic/320/4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg',
        username: 'vdkfrost',
      },
      additionalProp: '1',
    });
  });
});

describe('serializeInitDataQuery', () => {
  it('should properly serialize the value', () => {
    expect(
      serializeInitDataQuery({
        auth_date: new Date(1000),
        hash: 'Hash',
        signature: 'Signature',
        user: {
          id: 1,
          first_name: 'Pavel',
        },
        chat_instance: '-293',
        chat_type: 'group',
        chat: {
          id: 3,
          username: 'pavel',
          title: 'Some title',
          photo_url: '',
          type: 'self',
        },
        can_send_after: 911,
        query_id: 'QueryID',
        receiver: {
          id: 2,
          first_name: 'Pavel Buddy',
        },
        start_param: 'StartParam',
        additional_prop: 'PROP',
        prop1: ['a', 'b'],
      }),
    ).toBe('auth_date=1&hash=Hash&signature=Signature&user=%7B%22id%22%3A1%2C%22first_name%22%3A%22Pavel%22%7D&chat_instance=-293&chat_type=group&chat=%7B%22id%22%3A3%2C%22username%22%3A%22pavel%22%2C%22title%22%3A%22Some+title%22%2C%22photo_url%22%3A%22%22%2C%22type%22%3A%22self%22%7D&can_send_after=911&query_id=QueryID&receiver=%7B%22id%22%3A2%2C%22first_name%22%3A%22Pavel+Buddy%22%7D&start_param=StartParam&additional_prop=PROP&prop1=a&prop1=b');
  });
});