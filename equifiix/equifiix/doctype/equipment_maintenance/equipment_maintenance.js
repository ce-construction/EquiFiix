// Copyright (c) 2023, CE Construction and contributors
// For license information, please see license.txt

frappe.ui.form.on("Equipment Maintenance", {
	equip_id_:function(frm) {
        console.log("hello")
        frappe.call({
            method: 'frappe.client.get_value',
            args: {
                doctype: 'Equipment List',
                filters: { name: frm.doc.equip_id_ },
                fieldname: 'equi_name'
            },
            callback: function(response) {
                var full_name = response.message.equi_name;

                // Set the value to the field in the child table
                frm.set_value('custom_equip_name', full_name);
                
            }
        });

	},
    refresh:function(frm){
        var childTable = frm.doc.history_;
        
        if (frm.doc.history_ && frm.doc.history_.length > 0) {
            lastRow = frm.doc.history_[frm.doc.history_.length - 1];
            frm.set_value('custom_current_status', lastRow.status_s);
           
        }
        var firstRowStatus = childTable[0].status_s;
        console.log("Grid Name: ", frm.fields_dict.history_.grid);
        //console.log(firstRow_status);
        if (firstRowStatus) {
            frm.fields_dict.history_.grid.get_field(firstRowStatus).read_only = 1;
        }
        //frm.fields_dict.history_.grid.update_docfield_property(firstRow_status.status_s.fieldname, "read_only", 1);

        //alert(firstRow_status);
        //var fields = frm.fields_dict.history_.grid;
       
    }
    
});

frappe.ui.form.on('Equipment Status History', {
	refresh(frm) {
		// your code here

	}
})
