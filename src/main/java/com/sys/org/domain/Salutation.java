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
 * A Salutation.
 */
@Entity
@Table(name = "salutation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Salutation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "salutation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Person> persons = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Salutation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Person> getPersons() {
        return persons;
    }

    public Salutation persons(Set<Person> people) {
        this.persons = people;
        return this;
    }

    public Salutation addPersons(Person person) {
        this.persons.add(person);
        person.setSalutation(this);
        return this;
    }

    public Salutation removePersons(Person person) {
        this.persons.remove(person);
        person.setSalutation(null);
        return this;
    }

    public void setPersons(Set<Person> people) {
        this.persons = people;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Salutation salutation = (Salutation) o;
        if (salutation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salutation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Salutation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
