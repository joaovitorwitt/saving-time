from datetime import datetime


def get_current_week_of_the_year():
    """
    Calculate the current week number of the year based on the current date.

    Returns:
        int: The week number of the year.

    Raises:
        Exception: If any error occurs during the calculation.
    
    The function calculates the week number by finding the number of days
    that have passed since the start of the year and then dividing it by 7.
    It adds 1 to the result to ensure that the first week of the year is 
    considered as week 1.

    Example:
        week_number = get_current_week_of_the_year()
        print(f'Current week number: {week_number}')
    """
    try:
        current_date = datetime.now()
        start_date = datetime(current_date.year, 1, 1)
        days = (current_date - start_date).days
        week_number = (days // 7) + 1

        return week_number

    except Exception as error:
        return f"something went wrong: {str(error)}"
    

def get_todays_date():
    """
    Get the current date in the 'YYYY-MM-DD' format.

    This function retrieves the current date and formats it as a string in the 'YYYY-MM-DD' format.
    
    Returns:
        str: A string representing the current date in 'YYYY-MM-DD' format.

    Raises:
        Exception: If an error occurs during the date retrieval or formatting, an Exception is raised.
    
    Example:
        >>> get_todays_date()
        '2023-10-03'
    """
    try:
        current_day = datetime.today().strftime('%Y-%m-%d').strip()

        return current_day
    except Exception as error:
        return f"Something went wrong: {str(error)}"