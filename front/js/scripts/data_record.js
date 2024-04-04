
function max_data(data_record, colum_name) {
    let max_value;
    for(const row of data_record) {
        if (row[colum_name] > max_value || !max_value) {
            max_value = row[colum_name];
        }
    }
    return max_value
}

function min_data(data_record, colum_name) {
    let value;
    for(const row of data_record) {
        if (row[colum_name] > value || !value) {
            value = row[colum_name];
        }
    }
    return value
}

export {max_data, min_data}