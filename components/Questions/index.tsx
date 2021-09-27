import { FormEvent } from "react";
import { useState } from "react";
import supabase from "@/utils/supabaseClient";

export default function Questions() {
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const isDateValid = (str: string): boolean => {
    let pattern =
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return pattern.test(str);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isDateValid(date) === false) return alert("Invalid Date");
    console.log(date, firstName, lastName, phone);

    try {
      const user = supabase.auth.user();
      const updates = {
        id: user?.id,
        username: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        birth_date: date,
        phone_number: phone,
      };

      let { error } = await supabase.from("profiles").insert(updates);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      console.log("Backend complete");
    }
  };

  const userId = async () => {
    const user = await supabase.auth.user();

    console.log(user);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="tel"
          placeholder="225-345-4545"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="First Name"
          name="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          name="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          required
          type="date"
          placeholder="dd/mm/yyyy"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={() => userId()}>Log user id</button>
    </div>
  );
}
