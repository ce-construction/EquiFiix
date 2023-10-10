// Copyright (c) 2023, CE Construction and contributors
// For license information, please see license.txt

frappe.ui.form.on("Equipment List", {
	refresh(frm) {

	},
});


frappe.ui.form.on('Insurance Of Equipment', {
	expiry_date:function(frm, cdt, cdn) {
		var child = locals[cdt][cdn];
        var expiryDate = new Date(child.expiry_date);
        var today = new Date(frappe.datetime.get_today());
       
        var ins_date = frappe.datetime.get_diff(expiryDate, today);
        console.log(ins_date );
        frappe.model.set_value(cdt, cdn, 'remaining_days', ins_date);

        if(child.remaining_days <= 0){
            frappe.model.set_value(cdt, cdn, 'status', "Expired");
        }
        else if(!child.remaining_days ){
            frappe.model.set_value(cdt, cdn, 'status', " ");
        }
        else{
            frappe.model.set_value(cdt, cdn, 'status', "Active");
        }

	}
})

frappe.ui.form.on('Location and Site', {
	custom_site_date_table_add:function(frm, cdt, cdn) {
		// your code here
        var child = locals[cdt][cdn];
        frappe.call({
            method: 'frappe.client.get_value',
            args: {
                doctype: 'User',
                filters: { name: frappe.session.user },
                fieldname: 'full_name'
            },
            callback: function(response) {
                var full_name = response.message.full_name;
                frappe.model.set_value(cdt, cdn, 'user', full_name);
                //frappe.model.set_df_property(cdt, cdn,'user', 'read_only', 1);
            }
        });
    },
    to:function(frm, cdt, cdn){
        findCurrentLocation(frm);
    },
    custom_site_date_table_remove:function(frm){
        findCurrentLocation(frm);
    },

})

function findCurrentLocation(frm){
    var lastRow = null;
    
    // Check if the child table "item" exists
    if (frm.doc.custom_site_date_table && frm.doc.custom_site_date_table.length > 0) {
        lastRow = frm.doc.custom_site_date_table[frm.doc.custom_site_date_table.length - 1];
        frm.set_value('custom_current_location', lastRow.to);
    }
    else{
        frm.set_value('custom_current_location', "");
    }
    
}