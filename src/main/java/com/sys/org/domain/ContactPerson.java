package com.sys.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ContactPerson.
 */
@Entity
@Table(name = "contact_person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ContactPerson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private BasicInformation basicInformation;

    @ManyToOne
    private Designation designation;

    @OneToOne
    @JoinColumn(unique = true)
    private Person persons;

    @OneToMany(mappedBy = "contactPerson")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactInfo> contactInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BasicInformation getBasicInformation() {
        return basicInformation;
    }

    public ContactPerson basicInformation(BasicInformation basicInformation) {
        this.basicInformation = basicInformation;
        return this;
    }

    public void setBasicInformation(BasicInformation basicInformation) {
        this.basicInformation = basicInformation;
    }

    public Designation getDesignation() {
        return designation;
    }

    public ContactPerson designation(Designation designation) {
        this.designation = designation;
        return this;
    }

    public void setDesignation(Designation designation) {
        this.designation = designation;
    }

    public Person getPersons() {
        return persons;
    }

    public ContactPerson persons(Person person) {
        this.persons = person;
        return this;
    }

    public void setPersons(Person person) {
        this.persons = person;
    }

    public Set<ContactInfo> getContactInfos() {
        return contactInfos;
    }

    public ContactPerson contactInfos(Set<ContactInfo> contactInfos) {
        this.contactInfos = contactInfos;
        return this;
    }

    public ContactPerson addContactInfos(ContactInfo contactInfo) {
        this.contactInfos.add(contactInfo);
        contactInfo.setContactPerson(this);
        return this;
    }

    public ContactPerson removeContactInfos(ContactInfo contactInfo) {
        this.contactInfos.remove(contactInfo);
        contactInfo.setContactPerson(null);
        return this;
    }

    public void setContactInfos(Set<ContactInfo> contactInfos) {
        this.contactInfos = contactInfos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ContactPerson contactPerson = (ContactPerson) o;
        if (contactPerson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactPerson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactPerson{" +
            "id=" + getId() +
            "}";
    }
}
