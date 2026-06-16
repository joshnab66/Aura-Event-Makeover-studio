# Firebase Security Specification

## 1. Data Invariants
- Anyone can submit (create) a booking if it contains a completely valid data format.
- Booking IDs must be secure alphanumeric strings. Let's enforce that guest count is a positive integer and name, email, phone are non-empty.
- Existing bookings are immutable after creation, or else editable only by authorized administrators.
- Access to view (read/list) the master booking registry is restricted to authorized administrators or authenticated staff.

## 2. "Dirty Dozen" Payloads (Expected to return PERMISSION_DENIED)

1. **Payload 1: Empty Fields injection**
   - Create booking with empty name/phone.
2. **Payload 2: Keys Over-Injection (Shadow Fields)**
   - Create booking with additional fields like `isAdmin: true` or `role: "admin"`.
3. **Payload 3: Missing Required Fields**
   - Create booking without `email` field.
4. **Payload 4: Extreme String Size Injection (Buffer/Wallet Exhaustion)**
   - Inject a 1MB string into the `specialRequirements` field.
5. **Payload 5: Negative Guest Count Value**
   - Set `guestCount` to `-100` or `0`.
6. **Payload 6: String-injection into Int type**
   - Set `guestCount` to a string value like `"not_a_number"`.
7. **Payload 7: ID Malicious Character Poisoning**
   - Target document ID with malicious characters (`"b_@@##$$"`).
8. **Payload 8: Unauthorized Global Reading**
   - Attempting unauthenticated listing of booking items.
9. **Payload 9: External Mutation (Attempted Update by generic user)**
   - Modifying/updating someone else's booking without admin credentials.
10. **Payload 10: Unauthorized Deletion**
    - Standard or anonymous users attempting to delete bookings.
11. **Payload 11: Spoofed Timestamp Format**
    - Sending malicious input array for `createdAt` instead of a string.
12. **Payload 12: Fake Admin Injection**
    - Updating a database field with boolean state flags.

## 3. Mock Test Runner Setup
To verify security robustness, the testing rules will be simulated and validated using standard Fireproof unit structures.
