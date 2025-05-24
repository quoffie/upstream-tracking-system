```markdown
# paymentapi.md

## Cashout API for Integration with Banks and Merchants

### CASHOUT API

Credentials for Dev environment 
App ID: 2254289255
App Key:05552207

---

### INTERPAYAFRICA
EPA API for Companies making Cashouts

### Contents
- Method 1: CheckAvailableBalance ................................................................................................................................................ 3
- Method 2: CreateCashoutTrans ...................................................................................................................................................... 4
- Method 2.1: CreateCashoutGIP ....................................................................................................................................................... 7
- Method 3: GetTransStatus ............................................................................................................................................................. 10
- Method 4: GetTransList .................................................................................................................................................................. 11
- Method 5: MMCustomerCheck ..................................................................................................................................................... 13
- Method 6: GetGIPAccountInfo ...................................................................................................................................................... 14
- Method 7: Cashout Callback function ....................................................................................................................................... 15
- Status Code Table: ............................................................................................................................................................................. 17
- Cashout Flow Explained And Sample Response Guidelines ............................................................................................ 18
- CreateCashoutTrans/CreateCashoutGIP Sample Response ........................................................................................ 19
- GetTransStatus Sample Response .......................................................................................................................................... 19
- GhIPSS Instant Pay(GIP) Participant List and Routing Codes ................................................................................... 21

---

### URL’s
Below are the base URL’s and should be completed with the method URL in the table.

- Base URL For REST(Test Environment): https://testsrv.interpayafrica.com/v7/CashoutRESTV2.svc 
- Base URL For SOAP(Test Environment): https://testsrv.interpayafrica.com/v7/CashoutV2.svc 
- Base URL For REST(Dev Environment): https://devsrv.interpayafrica.com/v7/CashoutRestV2.svc 
- Base URL For REST(Live Environment): https://api.interpayafrica.com/v3/CashoutRESTV2.svc 

**APP ID:** [Will be provided separately on request for]  
**APP KEY:** [Will be provided separately on request]

> **NOTE:** In all API method calls always pass the APP_ID and APP_KEY as this will be used in the authentication process.

---

### Details of the API methods and parameters are as follows:

#### Method 1: CheckAvailableBalance

| Method Name           | Description                                    | URL                    | Parameters and explanation |
|-----------------------|------------------------------------------------|------------------------|----------------------------|
| CheckAvailableBalance | To check the available balance in Merchant’s account | /CheckAvailableBalance | See table below            |

**Parameters and Explanation:**

| Parameter Name   | Description                                   | Data Type       | Required | Default Value |
|------------------|-----------------------------------------------|-----------------|----------|---------------|
| Input Parameters:|                                              |                 |          |               |
| app_id           | API User ID(EPA authentic user)              | String(16)      | Yes      | 2452014126    |
| app_key          | API User Password(EPA authentic user password)| String(16)      | Yes      | test          |
| Output Parameters:|                                             |                 |          |               |
| status_code      | 1 if request successful or Error Number, if request failed. The error Message will be available in status_message field. | int             |          |               |
| status_message   | "Success" or Error Message                   | string          |          |               |
| Available_Balance| Return the amount available for the merchant for cash out transaction | Number          |          |               |

**Sample Request**
```
{ 
  "app_id":"************", 
  "app_key":"************", 
}
```

---

#### Method 2: CreateCashoutTrans

| Method Name        | Description                        | URL                  | Parameters and explanation |
|--------------------|------------------------------------|----------------------|----------------------------|
| CreateCashoutTrans | This will create a new Cashout Transaction | /CreateCashoutTrans | See table below            |

**Parameters and Explanation:**

| Parameter Name         | Description                                                                                       | Data Type     | Required | Default Value |
|------------------------|---------------------------------------------------------------------------------------------------|----------------|----------|---------------|
| Input Parameters:      |                                                                                                   |                |          |               |
| app_id                 | API User ID(Inter pay authentic user)                                                            | String(16)     | Yes      | 2452014126    |
| app_key                | API User Password(Inter pay authentic user password)                                              | String(16)     | Yes      | test          |
| transaction_date       | Transaction Date                                                                                  | Timestamp      | Yes      |               |
| expiry_date            | Transaction expiry date(should be greater than transaction date)                                  | Timestamp      | Yes      |               |
| transaction_type       | Cashout Type                                                                                      | String(10)     | Yes      | Default value= “local” |
| payment_mode           | 1. CAC: Cash At Counter(CAC) 2. MMT: Mobile Money Transaction 3. BAT: Bank Account Transaction    | String(3)      | Yes      |               |
| payee_name             | Payee/ Sender Name                                                                                | String(100)    | Yes      |               |
| payee_email            | Payee/ Sender Email                                                                               | String(50)     | No       | Anyone is mandatory |
| payee_mobile           | Payee Mobile                                                                                      | String(20)     | No       | mandatory     |
| recipient_name         | Recipient/Receiver Name                                                                           | String(100)    | Yes      |               |
| recipient_email        | Recipient/Receiver Email                                                                          | String(50)     | No       |               |
| recipient_mobile       | Recipient/Receiver Mobile                                                                         | String(20)     | No       | Anyone is mandatory. Mobile number is mandatory for (MMP) and also, in case SMS notification is required then mobile number is mandatory |
| recipient_ID_type      | Identification document type the receiver will show to verify for only “CAC” transaction type. The types are 1. VRN: Voter Registration Number 2. PP: Passport(PP), 3. NHI: National Health Insurance 4. NID: National ID String 5. DL: Driving Licence | String(3)      | No       |               |
| recipient_ID_number    | Identification document number of the recipient                                                  | String(30)     | No       |               |
| trans_currency         | Currency Code i.e. GHS                                                                            | String(3)      | Yes      | Default value= “GHS” |
| trans_amount           | Transacted Amount                                                                                 | String(20,2)   | Yes      |               |
| city_name              | City to receive Cashout                                                                           | String(100)    | No       |               |
| Bank_name              | Bank of the receiver                                                                              | String(100)    | No       |               |
| bank_branch_sort_code  | Preferred Bank Branch to receive funds (Mandatory if payment mode= BAT)                          | String(25)     | No       |               |
| bank_account_no        | Account number of the beneficiary (Mandatory if payment mode= BAT)                                | String(25)     | No       |               |
| bank_account_title     | Account title of the beneficiary (Mandatory if payment mode= BAT)                                 | String(100)    | No       |               |
| merch_trans_ref_no     | Merchant Transaction reference number                                                            | String(100)    | Yes      |               |
| Narration              | Narration for transaction                                                                         | String(255)    | No       |               |
| Output Parameters:     |                                                                                                   |                |          |               |
| status_code            | 1 if transaction is successful. or Error Number, if transaction is failed. The error Message will be available in status_message field. | int            |          |               |
| status_message         | “Success” or Error Message                                                                        | string         |          |               |
| trans_ref_no           | EPA Transaction reference number                                                                  | String(30)     |          |               |
| Signature              | The SHA-1 signature                                                                               |                |          |               |

**Sample Request**
```
{ 
  "app_id":"**************", 
  "app_key":"**************", 
  "mobile":"+233*********", 
  "transaction_date":"/Date(2023-11-05T16:54:34)/", 
  "expiry_date":"/Date(2023-12-06T16:54:34)/", 
  "transaction_type":"local", 
  "payment_mode":"MMT", 
  "payee_name":"", 
  "payee_email":"", 
  "payee_mobile":"***********", 
  "recipient_name":"", 
  "recipient_email":"", 
  "recipient_mobile":"+233*********", 
  "Recipient_ID_type":"", 
  "Recipient_ID_number":"", 
  "trans_currency":"GHS", 
  "trans_amount": 9, 
  "city_name":"ACCRA", 
  "bank_name":"", 
  "bank_branch_sort_code":"", 
  "bank_account_no":"", 
  "bank_account_title":"", 
  "merch_trans_ref_no":"RM007881003424", 
  "Narration":"" 
}
```

> **Note:** Transaction expiry date must be at least one day ahead of the transaction date, Format of transaction_date and expiry_date should be same as provided in the API doc.

---

#### Method 2.1: CreateCashoutGIP

| Method Name        | Description                        | URL                  | Parameters and explanation |
|--------------------|------------------------------------|----------------------|----------------------------|
| CreateCashoutGIP   | This will create a new Cashout Transaction | /CreateCashoutGIP | See table below            |

**Parameters and Explanation:**

| Parameter Name         | Description                                                                                       | Data Type     | Required | Default Value |
|------------------------|---------------------------------------------------------------------------------------------------|----------------|----------|---------------|
| Input Parameters:      |                                                                                                   |                |          |               |
| app_id                 | API User ID(Inter pay authentic user)                                                            | String(16)     | Yes      | 2452014126    |
| app_key                | API User Password(Inter pay authentic user password)                                              | String(16)     | Yes      | test          |
| transaction_date       | Transaction Date                                                                                  | Timestamp      | Yes      |               |
| expiry_date            | Transaction expiry date                                                                           | Timestamp      | Yes      |               |
| transaction_type       | Cashout Type                                                                                      | String(10)     | Yes      | Default value= “local” |
| Payment_mode           | 1. CAC: Cash At Counter(CAC) 2. MMT: Mobile Money Transaction 3. BAT: Bank Account Transaction    | String(3)      | Yes      |               |
| payee_name             | Payee/ Sender Name                                                                                | String(100)    | Yes      |               |
| payee_email            | Payee/ Sender Email                                                                               | String(50)     | No       | Anyone is mandatory |
| payee_mobile           | Payee Mobile                                                                                      | String(20)     | No       | Anyone is mandatory |
| recipient_name         | Recipient/Receiver Name                                                                           | String(100)    | Yes      |               |
| recipient_email        | Recipient/Receiver Email                                                                          | String(50)     | No       | Anyone is mandatory. Mobile number is mandatory for (MMP) and also, in case SMS notification is required then mobile number is mandatory |
| Recipient_ID_type      | Identification document type the receiver will show to verify for only “CAC” transaction type. The types are 1. VRN: Voter Registration Number 2. PP: Passport(PP), 3. NHI: National Health Insurance 4. NID: National ID String 5. DL: Driving Licence | String(3)      | No       |               |
| Recipient_ID_number    | Identification document number of the recipient                                                  | String(30)     | No       |               |
| trans_currency         | Currency Code i.e. GHS                                                                            | String(3)      | Yes      | Default value= “GHS” |
| trans_amount           | Transacted Amount                                                                                 | String(20,2)   | Yes      |               |
| city_name              | City to receive Cashout                                                                           | String(100)    | No       |               |
| bank_code              | Bank of the receiver                                                                              | String(25)     | Yes      |               |
| bank_name              | Bank of the receiver                                                                              | String(100)    | No       |               |
| bank_branch_sort_code  | Preferred Bank Branch to receive Cash out.(Mandatory if payment mode= BAT)                       | String(25)     | No       |               |
| bank_account_no        | Account number of the beneficiary (Mandatory if payment mode= BAT)                                | String(25)     | No       |               |
| Bank_account_title     | Account title of the beneficiary (Mandatory if payment mode= BAT)                                 | String(100)    | No       |               |
| merch_trans_ref_no     | Merchant Transaction reference number                                                            | String(20)     | Yes      |               |
| Narration              | Narration for transaction                                                                         | String(255)    | No       |               |
| Output Parameters:     |                                                                                                   |                |          |               |
| status_code            | 1 if transaction is successful. or Error Number, if transaction is failed. The error Message will be available in status_message field. | int            |          |               |
| status_message         | “Success” or Error Message                                                                        | string         |          |               |
| trans_ref_no           | EPA Transaction reference number                                                                  | String(30)     |          |               |
| Signature              | The SHA-1 signature                                                                               |                |          |               |

**Sample Request**
```
{
  "app_id":"",
  "app_key":"",
  "transaction_date":"/Date(2024-01-25T15:55:34)/",
  "expiry_date":"/Date(2024-01-27T16:54:34)/",
  "transaction_type":"local",
  "payment_mode":"BAT",
  "payee_name":"Sender Name",
  "payee_email":"sender@email.com",
  "payee_mobile":"0546348451",
  "recipient_name":"Receiver Name",
  "recipient_email":"receiver@email.com",
  "recipient_mobile":"+233546510086",
  "recipient_ID_type":"VRN",
  "recipient_ID_number":"1234567890",
  "trans_currency":"GHS",
  "trans_amount":"1.4",
  "city_name":"Accra",
  "bank_code":"300312",
  "bank_branch_sort_code":"Branch Code",
  "bank_account_no":"",
  "bank_account_title":"Account Title",
  "merch_trans_ref_no":"",
  "narration":"Transaction Narration"
}
```

> **Note:** Transaction expiry date must be at least one day ahead of the transaction date, Format of transaction_date and expiry_date should be same as provided above.

---

#### Method 3: GetTransStatus

**NOTE:** GetTransStatus is to be called in case of successful response from the GetTransStatus to check if transaction that was successfully accepted, has been processed.

| Method Name     | Description                             | URL              | Parameters and explanation |
|-----------------|-----------------------------------------|------------------|----------------------------|
| GetTransStatus  | This will verify Cashout Transaction status | /GetTransStatus | See table below            |

**Parameters and Explanation:**

| Parameter Name     | Description                                   | Data Type   | Required | Default Value |
|--------------------|-----------------------------------------------|-------------|----------|---------------|
| Input Parameters:  |                                               |             |          |               |
| app_id             | API User ID(Inter pay authentic user)        | String(16)  | Yes      | 2452014126    |
| app_key            | API User Password(Inter pay authentic user password) | String(16)  | Yes      | test          |
| merch_trans_ref_no | Merchant Transaction reference number        | String(20)  | Yes      |               |
| Output Parameters: |                                               |             |          |               |
| status_code        | 1 if transaction is successful.2 pending,3 expired,4 reversed,5 in-clearing or Error Number, if transaction is failed. The error Message will be available in status_message field. | Int         |          |               |
| status_message     | “Settled” or “Pending” or “Expired” or “Reversed” or “In-clearing” or Error Message | String      |          |               |
| payment_date       | Payout Date                                   | String(20)  |          |               |
| recipient_name     | Recipient Name(Provide only if payment mode= CAC) | String(100) |          |               |
| recipient_mobile   | Recipient contact/mobile(Provide only if payment mode= CAC) | String(20)  |          |               |
| recipient_id_type  | Identification Type NHIL, Voter ID etc.(Provide only if payment mode= CAC) | String(20)  |          |               |
| recipient_id_number| Identification String(Provided only if provide only if payment mode= CAC) | String(20)  |          |               |
| Bank_account_no    | Account number of the beneficiary (Mandatory if payment mode=BAT) | String(20)  | No       |               |
| Bank_account_title | Account title of the beneficiary (Mandatory if payment mode= BAT) | String(20)  | No       |               |
| recipient_mobile   | Recipient/Receiver Mobile(Mandatory if payment mode=MMT) | String(20)  | No       |               |
| Recipient_mobile_operator | Mobile operator of recipient(Mandatory if payment mode= MMT) | String(20)  | No       |               |
| trans_ref_no       | EPA Transaction reference number              | String(30)  | Yes      |               |

**Sample Request**
```
{
  "app_id":"**************", 
  "app_key":"**************", 
  "merch_trans_ref_no":"**************"
}
```

---

#### Method 4: GetTransList

| Method Name      | Description                                       | URL           | Parameters and explanation |
|------------------|---------------------------------------------------|---------------|----------------------------|
| CashoutTransList | This will provide list of all transactions for a particular day. | /GetTransList | See table below            |

**Parameters and Explanation:**

| Parameter Name     | Description                               | Description | Data Type | Required | Default Value |
|--------------------|-------------------------------------------|-------------|-----------|----------|---------------|
| Input Parameters:  |                                           |             |           |          |               |
| app_id             | API User ID(EPA authentic user)          | String(16)  | String(16)| Yes      | 2452014126    |
| app_key            | API User Password(EPA authentic user password) | String(16)  | String(16)| Yes      | test          |
| transaction_date   | Merchant Transaction date                 | Timestamp   | Timestamp | Yes      |               |
| Output Parameters: |                                           |             |           |          |               |
| This will be a list with following fields |                                           |             |           |          |               |
| trans_ref_no       | EPA Transaction reference number          | String(30)  |           |          |               |
| status_code        | 1 if transaction is successful.2 pending 3 expired,  4 reversed,  5 in-clearing.(refer to status code table below for all) |             |           |          |               |
| status_desc        | “Settled” or “Pending” or “Expired “or “ ” Reversed” or “In-clearing”. | String(100) |           |          |               |
| trans_date         | Transaction date                          | Timestamp   |           |          |               |
| expiry_date        | Transaction expiry date                   | Timestamp   |           |          |               |
| payment_date       | Payout Date(if status is paid otherwise NULL) | Timestamp   |           |          |               |
| Reversal_date      | reversal Date(if status is reversed otherwise NULL) | Timestamp   |           |          |               |
| recipient_name     | Recipient Name(Provided only if payment mode= CAC) | String(100) |           |          |               |
| recipient_mobile   | Recipient contact/mobile(Provided only if payment mode= CAC) | String(20)  |           |          |               |
| recipient_id_type  | Identification Type NHIL, Voter ID etc.(Provided only if payment mode= CAC) | String(20)  |           |          |               |
| Bank_account_no    | Account number of the beneficiary (provided in case payment mode=BAT) | String(20)  | No        |               |
| Bank_account_title | Account title of the beneficiary(provided if payment mode= BAT) | String(20)  | No        |               |
| recipient_mobile   | Recipient/Receiver Mobile(provided if payment mode=MMT) | String(20)  | No        |               |
| Recipient_mobile_operator | Mobile operator of recipient(provided in case payment mode= MMT) | String(20)  | No        |               |

**Sample Request**
```
} 
"app_id":"**************",
"app_key":"**************", 
"transaction_date":"**************"
}
```

---

#### Method 5: MMCustomerCheck

| Method Name      | Description                            | URL            | Parameters and explanation |
|------------------|----------------------------------------|----------------|----------------------------|
| MMCustomerCheck  | This will validate customer for Mobile Money registration | /MMCustomerCheck | See table below            |

**Parameters and Explanation:**

| Parameter Name     | Description                           | Description | Data Type | Required | Default Value |
|--------------------|---------------------------------------|-------------|-----------|----------|---------------|
| Input Parameters:  |                                       |             |           |          |               |
| app_id             | API User ID(EPA authentic user)      | API User ID(EPA authentic user) | String(16) | Yes | 2452014126 |
| app_key            | API User Password(EPA authentic user password) | API User Password(EPA authentic user password) | String(16) | Yes | test |
| mobile             | Mobile number with country code      | Mobile number with country code | String(20) | Yes | 233123456789 |
| network            | Mobile Network code                   | Mobile Network code | String(20) | No | MTN VODAFONE AIRTELTIGO |
| Output Parameters: |                                       |             |           |          |               |
| statusCode         | statusCode                            | 1 if method execution was success or Error Number, if operation is failed. The error Message will be available in status_message field | Int |          |               |
| statusMessage      | statusMessage                         | “Success” or Error Message | String |          |               |
| firstname          | firstname                             | Registered user First Name | String(30) |          |               |
| surname            | surname                               | Registered user sur name | String(3) |          |               |
| valid              | valid                                 | if MSISDN is registered for Mobile Money Service and Active. | Boolean |          | True: if registered and Active False: if not registered or inactive |

**Sample Request**
```
{ 
  "app_id":"*****", 
  "app_key":"*****", 
  "mobile":"***", 
  "network":"MTN" 
}
```

---

#### Method 6: GetGIPAccountInfo

This endpoint will return the bank account title against the provided data.

| Method Name        | Description          | URL              | Parameters and explanation |
|--------------------|----------------------|------------------|----------------------------|
| GetGIPAccountInfo  | This will get GIP account info | /GetGIPAccountInfo | See table below            |

**Parameters and Explanation:**

| Parameter Name     | Description                     | Data Type  | Required | Default Value |
|--------------------|---------------------------------|------------|----------|---------------|
| Input Parameters:  |                                 |            |          |               |
| app_id             | API User ID(EPA authentic user) | String(16) | Yes      | 2452014126    |
| app_key            | API User Password(EPA authentic user password) | String(16) | Yes      | test          |
| bank_code          | Bank of the receiver            | String(100)| Yes      |               |
| bank_account_no    | Account number of the beneficiary | String(25)| Yes      |               |
|                    |                                 |            |          |               |
| Output Parameters: |                                 |            |          |               |
| status_code        | 1 if the response is valid or Error Number, if operation is failed. The error Message will be available in status_message field | Int       |          |               |
| status_message     | “Success” or Error Message      | String     |          |               |
| bank_account_title | Account title of the beneficiary | String(100)|          |               |

---

#### Method 7: Cashout Callback function

Once the Cashout transaction is processed, a callback is sent to merchants whose URL is configured. We send following parameters(JSON) in POST call.

| Method Name        | Description                                     | URL                                                | Parameters and explanation |
|--------------------|-------------------------------------------------|----------------------------------------------------|----------------------------|
| CashoutCallback    | Callback received from EP on Cashout Status Change | Endpoint will be shared by the merchant            | See table below            |

**Parameters and Explanation:**

| Parameter Name     | Description                                     | Data Type   | Default Value |
|--------------------|-------------------------------------------------|-------------|---------------|
| trans_ref_no       | Emergent trans ref.                             | Number(20)  |               |
| transaction_date   |                                                 | Timestamp   |               |
| amount             |                                                 | Number(20,2)|               |
| transaction_type   |                                                 | String(10)  | “DR”          |
| merchant_trans_ref_no | Merchant trans ref.                          | String(20)  |               |
| transaction_status | Success/ rejected                               | int         | 1 success 2 rejected |

---

#### Method 8: GetGIPBanksRoutingCodes

This endpoint will return the list of GIP Supported Banks and their respective Routing Codes.

| Method Name           | Description                                   | URL                      | Parameters and explanation |
|-----------------------|-----------------------------------------------|--------------------------|----------------------------|
| GetGIPBanksRoutingCodes | This will get the list of all GIP Banks Routing Codes | /GetGIPBanksRoutingCodes | See table below            |

**Parameters and Explanation:**

| Parameter Name     | Description                                   | Data Type  | Required | Default Value |
|--------------------|-----------------------------------------------|------------|----------|---------------|
| Input Parameters:  |                                               |            |          |               |
| app_id             | API User ID(EPA authentic user)              | String(16) | Yes      | 2452014126    |
| app_key            | API User Password(EPA authentic user password)| String(16) | Yes      | test          |
| Output Parameters: |                                               |            |          |               |
| status_code        | 1 if the response is valid or Error Number, if operation is failed. The error Message will be available in status_message field | Int       |          |               |
| status_message     | “Success” or Error Message                   | String     |          |               |
| transactions       | List of GIP Banks and respective routing GIP Routing codes | Array     |          |               |

---

### Status Code Table:

| Code | Description                                      |
|------|-------------------------------------------------|
| 6    | <field_name> is missing                         |
| -1   | Server Error                                    |
| -100 | Server Error                                    |
| -10  | InvalidData(App_id, App_key Missing)            |
| 401  | Unauthorized                                    |
| 0    | Failure along with respective error message     |
| 5    | In Clearing(in progress)                        |
| 8    | CONFLICTATGW: Conflicting Transaction, which is failed/ under review by Telco and Emergent |
| 7    | INPROCESSATGW: In Process at Gateway: transaction is processed by payment processor |
| 1    | Success                                         |

---

### Cashout Flow Explained And Sample Response Guidelines

While the Cashout failure rate is less than 1% approx., in case of downtime at third party it’s important that for failed transactions are watched carefully. If you see failure rate 5% or more, it should be consulted with support team immediately.

Ideally the callback method should be implemented on the merchant ends so the callback is received as soon as the transaction is updated on the emergent side, it is callback is also received by the merchant at same time.

GetTransStatus should be called after 3-5 minutes and in case of still pending then next call should be sent after 10 minutes and next after that should be 30 mins. If you want to receive the real time notification, then callback method should be implemented.

Portal should be used to verify the status of the transaction prior to reaching out to support team for confirmation of status of a transaction.

---

### CreateCashoutTrans/CreateCashoutGIP Sample Response

In case of any other http code other than 200 OK i.e. http 500, no response(time out), consult with support team for any scheduled maintenance at emergent. This is not a normal flow hence should be treated specially without any automations against it at your end.

Valid Successful Response Sample(HTTP 200 OK)
```
{ 
  "status_code": 1, 
  "status_message":"SUCCESS", 
  "signature": null, 
  "trans_ref_no": 38992 
}
```

---

### GetTransStatus Sample Response

**Sample Responses**
```
{ 
  "status_code": 5, 
  "status_message":"IN-CLEARING", 
  "bank_account_no":"", 
  "bank_account_title":"", 
  "payment_date": null, 
  "recipient_address":"", 
  "recipient_id_number":"", 
  "recipient_id_type":"", 
  "recipient_last_name":"", 
  "recipient_mobile":"+23355515326", 
  "recipient_mobile_operator": null, 
  "recipient_name":"MoneyFex", 
  "trans_ref_no":"38992" 
}
```

Please make sure trans_ref_no is matching with the trans_ref_no gotten in the response when making the request initially for Cashout.

if you are getting a response which does not contain the recipient_name, recipient_mobile and trans_ref_no which is matching with response from createcashouttrans then it should be contacted to support for any possible transaction issue.

**Successful Transaction Response**
```
{ 
  "status_code": 1, 
  "status_message":"SUCCESS", 
  "bank_account_no":"", 
  "bank_account_title":"Seth Antwi", 
  "payment_date":"2022-05-31T14:24:32Z", 
  "recipient_address":"", 
  "recipient_id_number":"", 
  "recipient_id_type":"", 
  "recipient_last_name":"", 
  "recipient_mobile":"+233555515326", 
  "recipient_mobile_operator": null, 
  "recipient_name":"Shahzad Ali", 
  "trans_ref_no":"6638574" 
}
```

A Transaction that is processed and failed.
```
{ 
  "status_code": 0, 
  "status_message":"FAILED", 
  "bank_account_no":"", 
  "bank_account_title":"Seth Antwi", 
  "payment_date": null, 
  "recipient_address":"", 
  "recipient_id_number":"", 
  "recipient_id_type":"", 
  "recipient_last_name":"", 
  "recipient_mobile":"+23355515326", 
  "recipient_mobile_operator": null, 
  "recipient_name":"Shahzad Ali", 
  "trans_ref_no":"6381800" 
}
```

Below is Response in case of wrong Transaction Reference sent, you can see trans_ref_no is not valid, and we do not have recipient_mobile and recipient_name too.

You should consult support team if you are confident the merch_trans_ref_no sent by you in request is correct.
```
{ 
  "status_code": 0, 
  "status_message":"FAILED", 
  "bank_account_no":"", 
  "bank_account_title":"", 
  "payment_date": null, 
  "recipient_address":"", 
  "recipient_id_number":"", 
  "recipient_id_type":"", 
  "recipient_last_name":"", 
  "recipient_mobile":"", 
  "recipient_mobile_operator": null,
  "recipient_name":"", 
  "trans_ref_no":"-1" 
}
```

---

### GhIPSS INSTANT PAY – GIP Participant List and Routing Codes

| ROUTING CODE/ ID | PARTICIPANT                     |
|------------------|---------------------------------|
| 300334           | FIRST NATIONAL BANK            |
| 300302           | STANDARD CHARTERED BANK        |
| 300303           | ABSA BANK GHANA LIMITED        |
| 300304           | GCB BANK LIMITED               |
| 300305           | NATIONAL INVESTMENT BANK       |
| 300307           | AGRICULTURAL DEVELOPMENT BANK  |
| 300309           | UNIVERSAL MERCHANT BANK        |
| 300310           | REPUBLIC BANK LIMITED          |
| 300311           | ZENITH BANK GHANA LTD          |
| 300312           | ECOBANK GHANA LTD              |
| 300313           | CAL BANK LIMITED               |
| 300317           | PRUDENTIAL BANK LTD            |
| 300318           | STANBIC BANK                    |
| 300322           | GUARANTY TRUST BANK            |
| 300325           | UNITED BANK OF AFRICA          |
| 300329           | ACCESS BANK LIMITED            |
| 300331           | CONSOLIDATED BANK GHANA        |
| 300380           | ETRANZACT                      |
| 300591           | MTN MOBILE MONEY               |
| 300592           | AIRTEL TIGO MONEY              |
| 300594           | VODAFONE CASH                  |
| ROUTING CODE/ ID | PARTICIPANT                     |
| 300323           | FIDELITY BANK LIMITED          |
| 300361           | SERVICES INTEGRITY SAVINGS& LOANS |
| 300320           | BANK OF AFRICA                 |
| 300319           | FIRST BANK OF NIGERIA          |
| 300362           | GHL BANK                       |
| 300328           | BANK OF GHANA                  |
| 300316           | FIRST ATLANTIC BANK            |
| 300324           | SAHEL – SAHARA BANK(BSIC)      |
| 300574           | G-MONEY                        |
| 300306           | ARB APEX BANK LIMITED          |
| 300349           | OPPORTUNITY INTERNATIONAL SAVINGS AND LOANS |
| 300479           | ZEEPAY GHANA LIMITED           |
| 300308           | SOCIETE GENERALE GHANA         |
| 300356           | SINAPI ABA SAVINGS AND LOANS   |
| 300597           | YUP GHANA LIMITED              |

```