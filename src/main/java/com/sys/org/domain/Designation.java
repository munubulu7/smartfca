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
 * A Designation.
 */
@Entity
@Table(name = "designation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Designation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "designation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactPerson> contactPersons = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Designation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Designation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ContactPerson> getContactPersons() {
        return contactPersons;
    }

    public Designation contactPersons(Set<ContactPerson> contactPeople) {
        this.contactPersons = contactPeople;
        return this;
    }

    public Designation addContactPersons(ContactPerson contactPerson) {
        this.contactPersons.add(contactPerson);
        contactPerson.setDesignation(this);
        return this;
    }

    public Designation removeContactPersons(ContactPerson contactPerson) {
        this.contactPersons.remove(contactPerson);
        contactPerson.setDesignation(null);
        return this;
    }

    public void setContactPersons(Set<ContactPerson> contactPeople) {
        this.contactPersons = contactPeople;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Designation designation = (Designation) o;
        if (designation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), designation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Designation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
