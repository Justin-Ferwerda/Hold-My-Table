from datetime import datetime, timedelta

def check_if_reserved(tables, date, time):
    """checks if tables are reserved given a date and time, sets table.reserved True or False and returns tables"""

    year, month, day = date.split('-')
    hour, minutes, seconds = time.split(':')

    request_date = datetime(int(year), int(month), int(day), int(hour), int(minutes), int(seconds))

    for table in tables:
        reservations = table.table_reservations.all()
        if len(reservations):
            for res in reservations:
                date, time = str(res.date).split(' ')
                year, month, day = date.split('-')
                hour, minutes, seconds, _ = time[:-1].split(':')
                secs, _ = seconds.split('+')

                res_date = datetime(int(year), int(month), int(day), int(hour), int(minutes), int(secs))

                diff_1 = request_date - res_date
                diff_2 = res_date - request_date
                table.reserved = diff_1 <= timedelta(minutes=90) or diff_2 <= timedelta(minutes=90)

        else:
            table.reserved = False

    return tables
