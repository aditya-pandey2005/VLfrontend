def simulate_hvac(initial_temp, outside_temp, students, simulation_time):
    # Constants
    HEAT_PER_STUDENT = 100      # Watts
    AC_POWER_W = 5000           # Watts
    AC_POWER_KW = 5             # kW
    COST_PER_KWH = 8            # ₹ per unit

    C = 100000                  # Thermal capacity
    R = 2                       # Thermal resistance
    dt = 1                      # 1 minute step

    T = initial_temp
    ac_on_time = 0

    temperature_log = []
    hvac_status_log = []

    def hvac_control(temp):
        if temp > 24:
            return AC_POWER_W, "ON"
        elif temp < 22:
            return 0, "OFF"
        return 0, "OFF"

    for _ in range(simulation_time):
        Q_students = students * HEAT_PER_STUDENT
        Q_hvac, hvac_status = hvac_control(T)

        if Q_hvac > 0:
            ac_on_time += 1

        Q_wall = (outside_temp - T) / R
        T = T + dt * (Q_students + Q_wall - Q_hvac) / C

        temperature_log.append(round(T, 2))
        hvac_status_log.append(hvac_status)

    # Energy calculations
    energy_smart = round((ac_on_time / 60) * AC_POWER_KW, 2)
    energy_normal = round((simulation_time / 60) * AC_POWER_KW, 2)
    energy_saved = round(energy_normal - energy_smart, 2)
    cost_saved = round(energy_saved * COST_PER_KWH, 2)

    return {
        "students": students,
        "final_temperature": round(T, 2),
        "ac_on_time": ac_on_time,
        "energy_normal_kwh": energy_normal,
        "energy_smart_kwh": energy_smart,
        "energy_saved_kwh": energy_saved,
        "cost_saved_rs": cost_saved,
        "temperature_log": temperature_log,
        "hvac_status_log": hvac_status_log
    }
