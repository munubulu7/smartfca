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
 * A AddressFor.
 */
@Entity
@Table(name = "address_for")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AddressFor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "addressFor")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AddressInformation> addressInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public AddressFor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<AddressInformation> getAddressInfos() {
        return addressInfos;
    }

    public AddressFor addressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
        return this;
    }

    public AddressFor addAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.add(addressInformation);
        addressInformation.setAddressFor(this);
        return this;
    }

    public AddressFor removeAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.remove(addressInformation);
        addressInformation.setAddressFor(null);
        return this;
    }

    public void setAddressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AddressFor addressFor = (AddressFor) o;
        if (addressFor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressFor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressFor{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
