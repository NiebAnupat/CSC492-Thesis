INSERT INTO
    public.customer (
        customer_id,
        customer_provider,
        customer_google_id,
        email,
        "password",
        citizen_id,
        gender,
        fname,
        lname,
        telephone,
        address_line_1,
        address_line_2,
        birth_date,
        avatar,
        package
    )
VALUES (
        'Test',
        'local',
        NULL,
        'Test@test.test',
        'P@ssw0rdVF',
        '1111111111111',
        'male',
        'TestFname',
        'TestLname',
        '1111111111',
        'TestAddress',
        NULL,
        '06-08-2003',
        NULL,
        'vip'
    );