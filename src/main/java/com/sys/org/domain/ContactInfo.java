package com.sys.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ContactInfo.
 */
@Entity
@Table(name = "contact_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ContactInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contact_details")
    private String contactDetails;

    @ManyToOne
    private RegistrationInformation registrationInformation;

    @ManyToOne
    private ContactType contactType;

    @ManyToOne
    private ContactPerson contactPerson;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContactDetails() {
        return contactDetails;
    }

    public ContactInfo contactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
        return this;
    }

    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }

    public RegistrationInformation getRegistrationInformation() {
        return registrationInformation;
    }

    public ContactInfo registrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
        return this;
    }

    public void setRegistrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
    }

    public ContactType getContactType() {
        return contactType;
    }

    public ContactInfo contactType(ContactType contactType) {
        this.contactType = contactType;
        return this;
    }

    public void setContactType(ContactType contactType) {
        this.contactType = contactType;
    }

    public ContactPerson getContactPerson() {
        return contactPerson;
    }

    public ContactInfo contactPerson(ContactPerson contactPerson) {
        this.contactPerson = contactPerson;
        return this;
    }

    public void setContactPerson(ContactPerson contactPerson) {
        this.contactPerson = contactPerson;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ContactInfo contactInfo = (ContactInfo) o;
        if (contactInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactInfo{" +
            "id=" + getId() +
            ", contactDetails='" + getContactDetails() + "'" +
            "}";
    }
}
