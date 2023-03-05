from datetime import datetime, timedelta

def check_if_reserved(tables, request_date):
    """checks if tables are reserved given a date and time, sets table.reserved True or False and returns tables"""



    for table in tables:
        reservations = table.table_reservations.all()
        for res in reservations:
            date, time = str(res.date).split(' ')
            year, month, day = date.split('-')
            hour, minutes, seconds = time.split(':')
            res_date = datetime(int(year), int(month), int(day), int(hour), int(minutes), int(seconds))
            diff_1 = request_date - res_date

            table.reserved = timedelta(minutes=-90) < diff_1 < timedelta(minutes=90)

    return tables
