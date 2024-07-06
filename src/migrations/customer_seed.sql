INSERT INTO
    public.person_information (
        nationality,
        citizen_id,
        gender,
        prefix,
        first_name,
        last_name,
        telephone,
        address_line_1,
        address_line_2,
        provice_id,
        hire_date,
        birth_date,
        avatar,
        role,
        create_at,
        update_at,
        edit_by,
        deleted_at,
        branch_id
    )
VALUES (
        'TH',
        '1111111111111',
        'male',
        'Mr.',
        'TestFirstName',
        'TestLastName',
        '1111111111',
        'TestAddressLine1',
        NULL,
        NULL,
        NULL,
        '2003-06-08',
        NULL,
        'owner'::roles,
        now(),
        now(),
        NULL,
        NULL,
        NULL
    );

INSERT INTO
    public.customer (
        customer_id,
        provider,
        -- customer_google_id,
        email,
        "password",
        person_information_id,
        package
    )
VALUES (
        'TestID',
        'local'::customer_providers,
        -- '',
        'test@test.test',
        'testPassword',
        1,
        'free'::packages
    );