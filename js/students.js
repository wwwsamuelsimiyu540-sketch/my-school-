let currentSchoolId = null;


async function getCurrentSchool() {

    const {
        data: {
            user
        }
    } = await supabaseClient.auth.getUser();


    if (!user) {

        window.location.href = "index.html";

        return null;
    }


    const { data, error } =
        await supabaseClient
            .from("school_users")
            .select("school_id")
            .eq("user_id", user.id)
            .eq("status", "active")
            .limit(1)
            .single();


    if (error) {

        console.error(error);

        return null;
    }


    return data.school_id;
}


async function loadStudents() {

    const { data, error } =
        await supabaseClient
            .from("students")
            .select(`
                id,
                admission_number,
                first_name,
                middle_name,
                last_name,
                gender,
                phone,
                status
            `)
            .eq("school_id", currentSchoolId)
            .order("created_at", {
                ascending: false
            });


    if (error) {

        console.error(error);

        return;
    }


    const table =
        document.getElementById("studentTable");

    table.innerHTML = "";


    data.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.admission_number}
            </td>

            <td>
                ${student.first_name}
                ${student.middle_name || ""}
                ${student.last_name}
            </td>

            <td>
                ${student.gender || ""}
            </td>

            <td>
                ${student.phone || ""}
            </td>

            <td>
                ${student.status}
            </td>

        `;


        table.appendChild(row);

    });

}


document.addEventListener("DOMContentLoaded", async () => {

    currentSchoolId =
        await getCurrentSchool();


    if (!currentSchoolId)
        return;


    await loadStudents();


    document
        .getElementById("studentForm")
        .addEventListener("submit", async (event) => {

            event.preventDefault();


            const student = {

                school_id: currentSchoolId,

                admission_number:
                    document
                        .getElementById("admissionNumber")
                        .value.trim(),

                first_name:
                    document
                        .getElementById("firstName")
                        .value.trim(),

                middle_name:
                    document
                        .getElementById("middleName")
                        .value.trim(),

                last_name:
                    document
                        .getElementById("lastName")
                        .value.trim(),

                gender:
                    document
                        .getElementById("gender")
                        .value,

                date_of_birth:
                    document
                        .getElementById("dateOfBirth")
                        .value || null,

                phone:
                    document
                        .getElementById("phone")
                        .value.trim(),

                email:
                    document
                        .getElementById("email")
                        .value.trim()
            };


            const { error } =
                await supabaseClient
                    .from("students")
                    .insert(student);


            if (error) {

                document
                    .getElementById("studentMessage")
                    .textContent =
                    "Error: " + error.message;

                return;
            }


            document
                .getElementById("studentMessage")
                .textContent =
                "Student added successfully.";


            document
                .getElementById("studentForm")
                .reset();


            await loadStudents();

        });

});
