export class Reportdetails {
    siteId: number;
    reportId: number;
    userName: String;
    descriptionReport: String;
    reasonOfReport: String;
    installationType: String;
    descriptionPremise: String;
    estimatedWireAge: String;
    evidanceAddition: String;
    estimateAgeYes: String;
    previousRecords: String;
    lastInspection: String;
    nextInspection: String;
    extentInstallation: String;
    clientDetails: String;
    installationDetails: String;
    verficationDate: String;
    verifedEngineer: String;
    designation: String;
    company: String;
    createdBy: String;
    createdDate: Date;
    updatedBy: String;
    updatedDate: Date;

    SignatorDetails: SignatorDetails [];
}

export class SignatorDetails {
    signatorRole: String;
    personName: String;
    personContactNo: number;
    personMailID: String;
    managerName: String;
    managerContactNo: number;
    managerMailID: String;
    companyName: String;
    addressLine1: String;
    addressLine2: String;
    landMark: String;
    State: String;
    pinCode: number;
    declarationName: String;
    declarationDate: Date;
}

