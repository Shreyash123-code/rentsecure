# RentSecure Security Specification

## 1. Data Invariants
- **Properties**: Must contain valid `landlordId`. `verified` status can only be set by admins. Images must be valid URLs.
- **Leases**: Must link a `tenantId` and `landlordId`. `status` transitions must follow the flow: `Pending` -> `Active` -> `Completed`/`Disputed`.
- **Reputation**: Users cannot modify their own reputation score.

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)
1. **Unauthorized Creation**: Attempt to create a property without being logged in.
2. **Identity Spoofing**: Logged in as User A, attempt to create a property with `landlordId: User B`.
3. **Escalation of Privilege**: Attempt to set `verified: true` on a new property listing.
4. **Foreign Update**: Attempt to edit a property description that belongs to another landlord.
5. **ID Poisoning**: Attempt to create a property with a 500-character document ID.
6. **Relational Breach**: Attempt to create a lease for a non-existent `propertyId`.
7. **State Bypass**: Attempt to update a lease status from `Pending` directly to `Completed` without payment confirmation.
8. **Immutable Violation**: Attempt to change the `propertyId` of an existing lease.
9. **Reputation Tampering**: Attempt to manually increment the `score` in `/users/{userId}/reputation/score`.
10. **Shadow Field Injection**: Attempt to add a hidden field `isAdmin: true` to a user profile.
11. **Tenant Overreach**: Attempt to delete a lease agreement that is currently `Active`.
12. **Denial of Wallet**: Rapidly create hundreds of empty property drafts to exhaust storage quotas (throttled by rate limiting and validation).

## 3. Test Runner (Mock)
A corresponding test suite will be implemented to verify that these payloads return `PERMISSION_DENIED`.
