const cookies =[
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1763218061.005666,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-Install",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "5aab719e-ad11-4324-ac08-0ae1e72f85b1",
        "id": 1
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1762789708,
        "hostOnly": false,
        "httpOnly": false,
        "name": "_pcid",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "%7B%22browserId%22%3A%22m24ueic2lof8v2xt%22%2C%22_t%22%3A%22mhtbh84i%7Cm24uel0i%22%7D",
        "id": 2
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1762789665,
        "hostOnly": false,
        "httpOnly": false,
        "name": "_pctx",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAE0RXSwH18yBbABb4ARgHMRARggAffgCYALGFZIAHvAC%2BQA",
        "id": 3
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1774694405.295592,
        "hostOnly": false,
        "httpOnly": false,
        "name": "datadome",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "crythcF9Tzt3yjHgWhZt0F~AzUDYH8mYVMRZzezZ3hsZV~hv7pwPfk~nnwTtBS0GkT_uU7v0f8YKtiiHkYYd7bSD7vuFQAussjQF5pbaVWtD3wNGQn6ScD3sXuOhJdoX",
        "id": 4
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1760194104.646048,
        "hostOnly": false,
        "httpOnly": false,
        "name": "deviceId",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "def5e159-d3b7-4cee-8147-d247f357e925",
        "id": 5
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1744469265,
        "hostOnly": false,
        "httpOnly": false,
        "name": "didomi_token",
        "path": "/",
        "sameSite": "lax",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "eyJ1c2VyX2lkIjoiMTkyN2MwY2ItZjE4OC02ZjVlLWFmZjctYmJjMzI2NjgxN2Y2IiwiY3JlYXRlZCI6IjIwMjQtMTAtMTFUMTQ6NDc6NDMuMTI4WiIsInVwZGF0ZWQiOiIyMDI0LTEwLTExVDE0OjQ3OjQ1Ljc4OVoiLCJ2ZW5kb3JzIjp7ImVuYWJsZWQiOlsiZ29vZ2xlIiwiYzpsYmNmcmFuY2UiLCJjOnJldmxpZnRlci1jUnBNbnA1eCIsImM6cHVycG9zZWxhLTN3NFpmS0tEIiwiYzppbmZlY3Rpb3VzLW1lZGlhIiwiYzp0dXJibyIsImM6YWRpbW8tUGhVVm02RkUiLCJjOmdvb2dsZWFuYS00VFhuSmlnUiIsImM6dW5kZXJ0b25lLVRManFkVHBmIiwiYzptNnB1YmxpY2ktdFhUWUROQWMiLCJjOnJvY2tlcmJveC1mVE04RUo5UCIsImM6YWZmaWxpbmV0IiwiYzpzcG9uZ2VjZWxsLW55eWJBS0gyIiwiYzp0YWlsdGFyZ2UtbkdXVW5heTciLCJjOnRpa3Rvay1yS0FZRGdiSCIsImM6emFub3gtYVlZejZ6VzQiLCJjOnBpbnRlcmVzdCIsImM6aWduaXRpb25vLUxWQU1aZG5qIiwiYzpkaWRvbWkiLCJjOmxiY2ZyYW5jZS1IeTNrWU05RiJdfSwicHVycG9zZXMiOnsiZW5hYmxlZCI6WyJleHBlcmllbmNldXRpbGlzYXRldXIiLCJtZXN1cmVhdWRpZW5jZSIsInBlcnNvbm5hbGlzYXRpb25tYXJrZXRpbmciLCJwcml4IiwiZGV2aWNlX2NoYXJhY3RlcmlzdGljcyIsImNvbXBhcmFpc28tWTNaeTNVRXgiXX0sInZlbmRvcnNfbGkiOnsiZW5hYmxlZCI6WyJnb29nbGUiLCJjOnB1cnBvc2VsYS0zdzRaZktLRCIsImM6dHVyYm8iXX0sInZlcnNpb24iOjIsImFjIjoiRExXQThBRVlBTElCN2dFbGdRREFpU0JLUURFUUhUZ09yQWdZQkJ1Q0tnRWM0Skp3UzFnbXRCUVlDaEVGRm9LNTRXQ2hZTUMxVUZ0NExnd1hHQXVXQmdNRENJR1dvQUFBLkRMV0E4QUVZQUxJQjdnRWxnUURBaVNCS1FERVFIVGdPckFnWUJCdUNLZ0VjNEpKd1MxZ210QlFZQ2hFRkZvSzU0V0NoWU1DMVVGdDRMZ3dYR0F1V0JnTURDSUdXb0FBQSJ9",
        "id": 6
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1744469265,
        "hostOnly": false,
        "httpOnly": false,
        "name": "euconsent-v2",
        "path": "/",
        "sameSite": "lax",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "CQGVCkAQGVCkAAHABBENBKFkAP_gAELgAAAAJ9NB_G_dTSFi8X51YPtgcQ1P4VAjogAABgaJAwwBiBLAMIwEhmAAIAHqAAACABAAIDZAAQBlCADAAAAAYIAAAyAMAAAAIRAIJgAAAEAAAmJICABJC4AgAQAQgkgAABUAgAIAABogSFAAAAAAFAAAACAAAAAAAAAAAAAAQAAAAAAAAgAAAAAACAAAAAAEAFAAAAAAAAAAAAAAAAAEAAAAAAEELwATDQqIACwJCQg0DCAAACoIAgAgAAAAAJAwQAABAgAEAYACjAAAAAFAAAAAAAAABAAAAAAgAQgAAAAIEAAAAAEAAAAEAgEAAAAAAAAABAAAAAEAMAQAIAAgAAAAAIAQAAgAAgAJCgAAAAAAgAAABAAAAQAEAAAAAAAAAAAAAAAAQAAAAAABADFAAYAAgqEMAAwABBUIgABgACCoQAAA.f_wACFwAAAAA",
        "id": 7
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1747988883,
        "hostOnly": false,
        "httpOnly": false,
        "name": "include_in_experiment",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "true",
        "id": 8
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1758966162,
        "hostOnly": false,
        "httpOnly": false,
        "name": "luat",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyYjFjNmYwLWRiM2EtNTQ2Ny1hYmI2LTJlMzAxNDViZjc3MiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiYzhjZGFlNTEtMmRiMS00N2VmLWE2MTMtZjE4MjIxNzI5MDA3IiwiY2xpZW50X2lkIjoibGJjLWZyb250LXdlYiIsImRlcHJlY2F0ZWRfc3RvcmVfaWQiOjc2ODEzNDQ4LCJleHAiOjE3NDMxNjIxNjMsImlhdCI6MTc0MzE1NDk2MywiaW5zdGFsbF9pZCI6IjVhYWI3MTllLWFkMTEtNDMyNC1hYzA4LTBhZTFlNzJmODViMSIsImlzcyI6Imh0dHBzOi8vYXV0aC5sZWJvbmNvaW4uZnIiLCJqdGkiOiI0ZWNhYzA1My0yMGRmLTRjMzAtYmQ2Zi1jMTlkMWRhMzA2OGMiLCJzY29wZSI6ImxiYy4qLm1lLiogbGJjLnByaXZhdGUgb2ZmbGluZSBwb2xhcmlzLioubWUuKiBsYmMuKi4qLm1lLiogbGJjLmVzY3Jvd2FjY291bnQubWFpbnRlbmFuY2UucmVhZCBwb2xhcmlzLiouKi5tZS4qIiwic2Vzc2lvbl9pZCI6IjMyZjkxMDFmLTJjNTAtNDQ2ZC04ZGRjLTI1N2E4YzcyZDhkOSIsInNpZCI6IjMyZjkxMDFmLTJjNTAtNDQ2ZC04ZGRjLTI1N2E4YzcyZDhkOSIsInN1YiI6ImxiYztjOGNkYWU1MS0yZGIxLTQ3ZWYtYTYxMy1mMTgyMjE3MjkwMDc7NzY4MTM0NDgifQ.Ak4lGj0PuFjdHs8skJrYyCkASzXp-fB2zdyHOCnhvjcMmDyTOuaTwAeKKek40j8mP_1jABzGdOsJ8orbn4ZSjrxk9UiEVdqMtMI5zJ3gcvq2URLJ2-yvZdEH5n3b56zKXr9ftdyTdnKfc4n-U6fZQDNQg9LbYJomjIJz_b_dToHdxPj4qlGqUTaztBUW94E6_DNopAJs_Dkzq7sU2Z5SK6SjSI6Qpin6PWhgqkrd7hE5apJtXmA9BaJJlUNMb5QLz6NyCQIm3lwfT6a7kTf6FB758UZy3RweFJfa8WDSzFFeAPHxloNoYccVF3hnlSAMThUUMGQuPMG7ApRg9uOuoNSa7JgImMI4smO8jdpck4P1TQxjw9iTgmXTIbOIjTGofqr78fmlvCwHEKc7xiybqh_btn_XbaWVNr3qyRNmtj2K6AhIawEy5x5NUoYBJMBJjfsvWcAj0A8gdePlHONPaKMzQGP1d5JBQyg7fMqD-c7OiBOCgmR8IiHJpX4iIIfNJHolTmIiCS9TYPd4SMlLHwdDXu9t10D5-F-qNX7e9fx0GBHPRldAx4A-Lbh6IIat0fkY1JdZl_G82X4ZI2NQKSFPDS6vXo4QWAhoxb29yBTbwbvWIyliLmLknUkEj5163-dIzKm3T4Hfs7oCS4VkhUskeKdoK1SpLZNA7lRNDPw",
        "id": 9
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1760194067,
        "hostOnly": false,
        "httpOnly": false,
        "name": "ry_ry-l3b0nco_realytics",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "eyJpZCI6InJ5X0M4MjQxNEQ4LTYwOEYtNDgzNy05Q0ZCLUI1OUQ5MjI5NTAyOSIsImNpZCI6bnVsbCwiZXhwIjoxNzYwMTk0MDY3MDgwLCJjcyI6MX0%3D",
        "id": 10
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1743160204,
        "hostOnly": false,
        "httpOnly": false,
        "name": "ry_ry-l3b0nco_so_realytics",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "eyJpZCI6InJ5X0M4MjQxNEQ4LTYwOEYtNDgzNy05Q0ZCLUI1OUQ5MjI5NTAyOSIsImNpZCI6bnVsbCwib3JpZ2luIjpmYWxzZSwicmVmIjpudWxsLCJjb250IjpudWxsLCJucyI6dHJ1ZSwic2MiOiJvayIsInNwIjpudWxsfQ%3D%3D",
        "id": 11
    },
    {
        "domain": ".leboncoin.fr",
        "expirationDate": 1774694404,
        "hostOnly": false,
        "httpOnly": false,
        "name": "utag_main",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "v_id:01927c0cc6f500095366354d7bc40506f001906700978$_sn:10$_ss:0$_st:1743160204593$_pn:9%3Bexp-session$ses_id:1743154962019%3Bexp-session",
        "id": 12
    },
    {
        "domain": "www.leboncoin.fr",
        "expirationDate": 1743159314,
        "hostOnly": true,
        "httpOnly": false,
        "name": "_dd_s",
        "path": "/",
        "sameSite": "strict",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "aid=62866243-08ae-4c0c-9dbd-78fef210ec92&rum=0&expire=1743159302902",
        "id": 13
    },
    {
        "domain": "www.leboncoin.fr",
        "expirationDate": 1762789708,
        "hostOnly": true,
        "httpOnly": false,
        "name": "_pcid",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "%7B%22browserId%22%3A%22m24ueic2lof8v2xt%22%2C%22_t%22%3A%22mhtbh84i%7Cm24uel0i%22%7D",
        "id": 14
    },
    {
        "domain": "www.leboncoin.fr",
        "expirationDate": 1762789665,
        "hostOnly": true,
        "httpOnly": false,
        "name": "_pctx",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAE0RXSwH18yBbABb4ARgHMRARggAffgCYALGFZIAHvAC%2BQA",
        "id": 15
    },
    {
        "domain": "www.leboncoin.fr",
        "hostOnly": true,
        "httpOnly": false,
        "name": "dblockS",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": true,
        "storeId": "0",
        "value": "22",
        "id": 16
    },
    {
        "domain": "www.leboncoin.fr",
        "expirationDate": 1777318403,
        "hostOnly": true,
        "httpOnly": false,
        "name": "dblockV",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "8",
        "id": 17
    },
    {
        "domain": "www.leboncoin.fr",
        "expirationDate": 1776375767,
        "hostOnly": true,
        "httpOnly": false,
        "name": "pa_privacy",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "%22optin%22",
        "id": 18
    }
    ]

export default cookies;