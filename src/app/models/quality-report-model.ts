export class QualityReportModel {
    id:string;
    report_img_url: string;
    report_txt: string;
    created_date: any;
    updated_date: any;
    created_by: string;
    updated_by: string;
    doc_id?: string;
    status:number;
    selected?:boolean;
    description:string;
    laboratary_name:string;
    lab_address:string;
    action?:string;
}
